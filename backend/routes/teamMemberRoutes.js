import express from "express";
import {
  createTeamMember,
  getTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamMemberController.js";
import { upload } from "../middlewares/multer.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getTeamMembers);
router.get("/:id", getTeamMemberById);

// Protected
router.post("/", authenticateUser, upload.single("profileImage"), createTeamMember);
router.put("/:id", authenticateUser, upload.single("profileImage"), updateTeamMember);
router.delete("/:id", authenticateUser, deleteTeamMember);

export default router;   