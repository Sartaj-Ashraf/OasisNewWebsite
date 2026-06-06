import express from "express";
import {upload} from "../middlewares/multer.js";


import { getProjects, createProject, updateProject, deleteProject, getAllCategories,getAllProjects } from "../controllers/projectsController.js";
const projectImages = upload.fields([
  { name: "thumbnail",    maxCount: 1 },
  { name: "scrollerImage", maxCount: 1 },
  { name: "logo",         maxCount: 1 },
]);
const router = express.Router();

router.get("/", getProjects);
router.post("/create",projectImages,createProject)
router.get("/allProjects",getAllProjects)
router.put("/:id",projectImages,updateProject)
router.delete("/:id",deleteProject)
router.get("/categories", getAllCategories)

export default router;