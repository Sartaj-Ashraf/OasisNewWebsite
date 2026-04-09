import Video from "../models/videomodel.js";
import Client from "../models/clientModel.js";

import { uploadToS3, deleteFromS3 } from "../utils/s3Upload.js";
import { getPaginationParams, getPaginationInfo } from "../utils/pagination.js";

const POPULATE_CLIENT = { path: "client", select: "name slug" };

// ─── CREATE ───────────────────────────────────────────────────────────────────
export const createVideo = async (req, res) => {

    const { title, platform, sourceUrl, client, isActive } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    if (!platform) {
      return res.status(400).json({ success: false, message: "Platform is required" });
    }

    const order = req.body.order !== undefined ? Number(req.body.order) : 0;

    const thumbnail =
      req.files?.thumbnail?.[0] ? await uploadToS3(req.files.thumbnail[0], "videos/thumbnails") : {};
    const video =
      req.files?.video?.[0] ? await uploadToS3(req.files.video[0], "videos/files") : {};

    const doc = await Video.create({
      title,
      thumbnail,
      video,
      platform,
      sourceUrl: sourceUrl || "",
      client: client || null,
      order,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({ success: true, data: doc });
 
};

// ─── GET ALL (paginated + search) ─────────────────────────────────────────────
export const getVideos = async (req, res) => {
  
    const { page, limit, skip } = getPaginationParams(req.query);
    const { search, platform } = req.query;

    const query = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    if (platform) query.platform = platform;

    const [videos, totalDocs] = await Promise.all([
      Video.find(query)
        .populate(POPULATE_CLIENT)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Video.countDocuments(query),
    ]);

    const pagination = getPaginationInfo(totalDocs, page, limit);

    res.json({ success: true, data: videos, pagination });

};

// ─── GET ACTIVE (public — no pagination) ──────────────────────────────────────
export const getActiveVideos = async (req, res) => {
    const videos = await Video.find({ isActive: true })
      .populate(POPULATE_CLIENT)
      .sort({ order: 1, createdAt: -1 });

    res.json({ success: true, data: videos });

};

// ─── GET ONE BY ID ────────────────────────────────────────────────────────────
export const getVideoById = async (req, res) => {
 
    const video = await Video.findById(req.params.id).populate(POPULATE_CLIENT);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }
    res.json({ success: true, data: video });
 
};

// ─── GET BY CLIENT ────────────────────────────────────────────────────────────
export const getVideosByClient = async (req, res) => {

    const videos = await Video.find({
      client: req.params.clientId,
      isActive: true,
    })
      .populate(POPULATE_CLIENT)
      .sort({ order: 1, createdAt: -1 });

    res.json({ success: true, data: videos });
  
};

// ─── GET BY CLIENT SLUG ───────────────────────────────────────────────────────
export const getVideosByClientSlug = async (req, res) => {
 

    const client = await Client.findOne({ slug: req.params.slug }).select("_id").lean();
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    const videos = await Video.find({ client: client._id, isActive: true })
      .populate(POPULATE_CLIENT)
      .sort({ order: 1, createdAt: -1 });

    res.json({ success: true, data: videos });
  
};

// ─── GET BY PLATFORM ──────────────────────────────────────────────────────────
export const getVideosByPlatform = async (req, res) => {

    const videos = await Video.find({
      platform: req.params.platform,
      isActive: true,
    })
      .populate(POPULATE_CLIENT)
      .sort({ order: 1, createdAt: -1 });

    res.json({ success: true, data: videos });

};

// ─── UPDATE ───────────────────────────────────────────────────────────────────
export const updateVideo = async (req, res) => {
 
    const { title, platform, sourceUrl, client, order, isActive } = req.body;

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    // Snapshot previous values BEFORE any mutations
    video._previousClient = video.client ?? null;
    video._previousOrder = video.order;

    if (req.files?.thumbnail?.[0]) {
      if (video.thumbnail?.key) await deleteFromS3(video.thumbnail.key);
      video.thumbnail = await uploadToS3(req.files.thumbnail[0], "videos/thumbnails");
    }

    if (req.files?.video?.[0]) {
      if (video.video?.key) await deleteFromS3(video.video.key);
      video.video = await uploadToS3(req.files.video[0], "videos/files");
    }

    if (title !== undefined) video.title = title;
    if (platform !== undefined) video.platform = platform;
    if (sourceUrl !== undefined) video.sourceUrl = sourceUrl;
    if (isActive !== undefined) video.isActive = isActive;

    // Client must be assigned BEFORE order so hook sees the correct new group
    if (client !== undefined) video.client = client || null;

    // Order assigned last — hook uses it to shift siblings within the new group
    if (order !== undefined) video.order = Number(order);

    await video.save();

    res.json({ success: true, data: video });

};

// ─── DELETE ───────────────────────────────────────────────────────────────────
export const deleteVideo = async (req, res) => {
 
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    if (video.thumbnail?.key) await deleteFromS3(video.thumbnail.key);
    if (video.video?.key) await deleteFromS3(video.video.key);

    await video.deleteOne();

    res.json({ success: true, message: "Video deleted successfully" });

};