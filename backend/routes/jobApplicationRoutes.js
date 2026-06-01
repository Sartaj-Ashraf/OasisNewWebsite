import express from "express";
const router = express.Router();
import {sendJobApplication, getApplications, deleteApplication, updateApplicationStatus} from "../controllers/jobApplicationController.js";
import { jobApplicationValidator } from "../validations/jobApplication.validation.js";
import { upload } from "../middlewares/multer.js";

router.post(
    "/apply",
    upload.single("resume"),
    jobApplicationValidator,
    sendJobApplication
);
router.get("/applications", getApplications);
router.patch("/applications/:applicationId", updateApplicationStatus);
router.delete("/applications/:applicationId", deleteApplication);
export default router;