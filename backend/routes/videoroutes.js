import express from "express";
import {
  createVideo,
  getVideos,
  getActiveVideos,
  getVideoById,
  getVideosByClient,
  getVideosByClientSlug,
  getVideosByPlatform,
  updateVideo,
  deleteVideo,
} from "../controllers/videocontroller.js";
import { upload } from "../middlewares/multer.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ─── Public ───────────────────────────────────────────────────────────────────
router.get("/active", getActiveVideos);
router.get("/client/:clientId", getVideosByClient);
router.get("/client-slug/:slug", getVideosByClientSlug);
router.get("/platform/:platform", getVideosByPlatform);
router.get("/", getVideos);
router.get("/:id", getVideoById);

// ─── Protected ────────────────────────────────────────────────────────────────
router.post(
  "/",
  authenticateUser,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createVideo
);

router.put(
  "/:id",
  authenticateUser,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateVideo
);

router.delete("/:id", authenticateUser, deleteVideo);

export default router;