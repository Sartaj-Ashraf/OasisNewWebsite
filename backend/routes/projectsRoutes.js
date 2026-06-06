import express from "express";
import {upload} from "../middleware/multer.js";


import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectsController.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/create",upload.single("projectImage"),createProject)

router.put("/:id",upload.single("projectImage"),updateProject)
router.delete("/:id",deleteProject)

export default router;