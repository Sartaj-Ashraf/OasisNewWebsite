// backend/controllers/sitemapController.js

import Blog from "../models/blogsModel.js";
import Careers from "../models/careersModel.js";

export const getSitemapData = async (req, res) => {
  try {
    const [blogs, careers] = await Promise.all([
      Blog.find({ isPublished: true }, "slug updatedAt").lean(),
      Careers.find({ isActive: true }, "slug updatedAt").lean(),
    ]);

    res.json({
      blogs,
      careers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error generating sitemap data",
    });
  }
};