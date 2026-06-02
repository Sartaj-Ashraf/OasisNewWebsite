import Blog from "../models/blogsModel.js";
import { makeSlug } from "../utils/slugUtils.js";
import { uploadToS3, deleteFromS3 } from "../utils/s3Upload.js";
import mongoose from "mongoose";
/* =========================
   CREATE BLOG
========================= */
export const createBlog = async (req, res) => {
    const uploadedKeys = []; // ✅ track for rollback

    try {
        const { title, excerpt, content, isPublished,isFeatured } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }


        /* =========================
           PARSE CONTENT
        ========================= */
        let parsedContent;
        try {
            parsedContent = JSON.parse(content || "[]");
        } catch {
            return res.status(400).json({
                success: false,
                message: "Invalid content JSON",
            });
        }

        if (!Array.isArray(parsedContent) || parsedContent.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Content is required",
            });
        }

        /* =========================
           NORMALIZE FILES
        ========================= */
        const filesArray = Array.isArray(req.files)
            ? req.files
            : Object.values(req.files || {}).flat();

        const fileMap = {};
        filesArray.forEach((file) => {
            fileMap[file.fieldname] = file;
        });

        /* =========================
           PROCESS BLOCKS
        ========================= */
        const updatedContent = await Promise.all(
            parsedContent.map(async (block) => {
                if (block.type !== "image") {
                    return {
                        ...block,
                        content: block.content ?? "",
                    };
                }

                const keyName = `image_block_${block.id}`;
                const file = fileMap[keyName];

                // ❌ No file for image block
                if (!file) {
                    throw new Error(`Image missing for block ${block.id}`);
                }

                // ✅ Upload
                const uploaded = await uploadToS3(file);

                // track for rollback
                uploadedKeys.push(uploaded.key);

                return {
                    ...block,
                    content: {
                        url: uploaded.url,
                        key: uploaded.key,
                    },
                    meta: {
                        alt: block.meta?.alt || "",
                        caption: block.meta?.caption || "",
                    },
                };
            })
        );
        let coverImageData = { url: "", key: "" };
        const coverFile = fileMap["coverImage"];
        if (!coverFile) {
            return res.status(400).json({
                success: false,
                message: "Cover image is required",
            });
        }
        const uploaded = await uploadToS3(coverFile);
        uploadedKeys.push(uploaded.key);
        coverImageData = { url: uploaded.url, key: uploaded.key };
        /* =========================
           CREATE BLOG
        ========================= */
        const blog = await Blog.create({
            title,
            slug: makeSlug(title),
            excerpt,
            content: updatedContent,
            coverImage: coverImageData,
            isPublished: isPublished === "true",
            isFeatured: isFeatured === "true",
            publishedAt: isPublished === "true" ? new Date() : null,
        });

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog,
        });

    } catch (error) {
        console.error("CREATE BLOG ERROR:", error);

        /* =========================
           CLEANUP (ROLLBACK S3)
        ========================= */
        if (uploadedKeys.length > 0) {
            await Promise.all(
                uploadedKeys.map((key) => deleteFromS3(key))
            );
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
/* =========================
   UPDATE BLOG
========================= */
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await Blog.findById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        /* =========================
           NORMALIZE FILES
        ========================= */
        const filesArray = Array.isArray(req.files)
            ? req.files
            : Object.values(req.files || {}).flat();

        const fileMap = {};

        filesArray.forEach((file) => {
            if (!fileMap[file.fieldname]) {
                fileMap[file.fieldname] = file;
            }
        });

        /* =========================
           CONTENT UPDATE
        ========================= */
        let updatedContent = existing.content;

        if (req.body.content) {
            let parsedContent;

            try {
                parsedContent = JSON.parse(req.body.content);
            } catch {
                return res.status(400).json({
                    success: false,
                    message: "Invalid content JSON",
                });
            }

            updatedContent = await Promise.all(
                parsedContent.map(async (block) => {

                    /* =========================
                       NON IMAGE BLOCKS
                    ========================= */
                    if (block.type !== "image") {
                        return {
                            ...block,
                            content: block.content ?? "",
                        };
                    }

                    const keyName = `image_block_${block.id}`;
                    const file = fileMap[keyName];

                    const oldBlock = existing.content.find(
                        (b) => b.id === block.id
                    );

                    /* =========================
                       NEW IMAGE UPLOAD
                    ========================= */
                    if (file) {

                        // upload first
                        const uploaded = await uploadToS3(file);

                        // delete old image AFTER success
                        if (oldBlock?.content?.key) {
                            await deleteFromS3(oldBlock.content.key);
                        }

                        return {
                            ...block,
                            content: {
                                url: uploaded.url,
                                key: uploaded.key,
                            },
                            meta: {
                                alt:
                                    block.meta?.alt ||
                                    oldBlock?.meta?.alt ||
                                    "",

                                caption:
                                    block.meta?.caption ||
                                    oldBlock?.meta?.caption ||
                                    "",
                            },
                        };
                    }

                    /* =========================
                       KEEP EXISTING IMAGE
                    ========================= */
                    if (oldBlock?.content) {
                        return {
                            ...block,
                            content: oldBlock.content,
                            meta: {
                                alt:
                                    block.meta?.alt ||
                                    oldBlock?.meta?.alt ||
                                    "",

                                caption:
                                    block.meta?.caption ||
                                    oldBlock?.meta?.caption ||
                                    "",
                            },
                        };
                    }

                    /* =========================
                       IMAGE MISSING
                    ========================= */
                    throw new Error(
                        `Image missing for block ${block.id}`
                    );
                })
            );
        }

        /* =========================
           COVER IMAGE UPDATE
        ========================= */
        let coverImageUpdate = {};

        const coverFile = fileMap["coverImage"];

        if (coverFile) {

            // upload new cover first
            const uploaded = await uploadToS3(coverFile);

            // delete old cover after success
            if (existing.coverImage?.key) {
                await deleteFromS3(existing.coverImage.key);
            }

            coverImageUpdate = {
                coverImage: {
                    url: uploaded.url,
                    key: uploaded.key,
                },
            };
        }

        /* =========================
           UPDATE BLOG
        ========================= */
        const updated = await Blog.findByIdAndUpdate(
            id,
            {
                title: req.body.title || existing.title,

                // keep custom slug support
                slug: req.body.slug || existing.slug,

                excerpt:
                    req.body.excerpt ?? existing.excerpt,

                content: updatedContent,

                ...coverImageUpdate,

                isPublished:
                    req.body.isPublished !== undefined
                        ? req.body.isPublished === "true"
                        : existing.isPublished,

                publishedAt:
                    req.body.isPublished === "true"
                        ? existing.publishedAt || new Date()
                        : null,
                
                isFeatured:
                    req.body.isFeatured !== undefined
                        ? req.body.isFeatured === "true"
                        : existing.isFeatured,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updated,
        });

    } catch (error) {

        console.error("UPDATE BLOG ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

/* =========================
   DELETE BLOG
========================= */
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        //  await deleteFromS3(block.content.key);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }
        if (blog.coverImage?.key) {
            await deleteFromS3(blog.coverImage.key);
        }

        // ✅ delete all images from S3
        for (const block of blog.content) {
            if (block.type === "image" && block.content?.key) {
                await deleteFromS3(block.content.key);
            }
        }

        await blog.deleteOne();

        res.json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   GET ALL BLOGS (PUBLIC)   
========================= */
export const getAllBlogs = async (req, res) => {
  try {
    const {
      search,
      isFeatured,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
      isPublished: true,
    };

    // Featured filter
    if (isFeatured === "true") {
      filter.isFeatured = true;
    }

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = Math.max(parseInt(page) || 1, 1);
    const limitNumber = Math.max(parseInt(limit) || 10, 1);
    const skip = (pageNumber - 1) * limitNumber;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .select("publishedAt title slug excerpt coverImage")
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      Blog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
        hasNextPage: pageNumber * limitNumber < total,
        hasPrevPage: pageNumber > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   ADMIN GET ALL
========================= */
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const {
      isFeatured,
      isPublished,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // ─── FEATURED FILTER ───
    if (isFeatured === "true") {
      filter.isFeatured = true;
    }
    if (isFeatured === "false") {
      filter.isFeatured = false;
    }

    // ─── PUBLISHED FILTER ───
    if (isPublished === "true") {
      filter.isPublished = true;
    }
    if (isPublished === "false") {
      filter.isPublished = false;
    }

    // ─── SEARCH FILTER ───
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = Math.max(parseInt(page) || 1, 1);
    const limitNumber = Math.max(parseInt(limit) || 10, 1);
    const skip = (pageNumber - 1) * limitNumber;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .select("title slug excerpt isPublished isFeatured")
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      Blog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
        hasNextPage: pageNumber * limitNumber < total,
        hasPrevPage: pageNumber > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET BY SLUG
========================= */
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            slug: req.params.slug,

        }).lean();

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.json({
            success: true,
            data: blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


/* =========================
   TOGGLE STATUS
========================= */
export const toggleBlogStatus = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        blog.isPublished = !blog.isPublished;
        blog.publishedAt = blog.isPublished ? new Date() : null;

        await blog.save();

        res.json({
            success: true,
            message: "Status updated",
            data: blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   REORDER SECTIONS
========================= */
export const reorderContentSections = async (req, res) => {
    try {
        const { sectionOrder } = req.body;

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        if (!Array.isArray(sectionOrder)) {
            return res.status(400).json({ message: "Invalid order" });
        }
        const reordered = sectionOrder
            .map((id) => blog.content.find((b) => b.id === id))
            .filter(Boolean);

        if (reordered.length !== sectionOrder.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid section IDs",
            });
        }
        blog.content = reordered.filter(Boolean);

        await blog.save();

        res.json({
            success: true,
            message: "Content reordered",
            data: blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   STATS
========================= */
export const getBlogStats = async (req, res) => {
    try {
        const total = await Blog.countDocuments();
        const published = await Blog.countDocuments({ isPublished: true });

        res.json({
            success: true,
            data: {
                total,
                published,
                draft: total - published,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getRandomBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const randomBlogs = await Blog.aggregate([
      {
        $match: {
          isPublished: true,
          _id: { $ne: new mongoose.Types.ObjectId(blogId) }
        }
      },
      {
        $sample: { size: 3 }
      }
    ]);

    res.json({
      success: true,
      data: randomBlogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};