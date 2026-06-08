import "express-async-errors";
// config env
import * as dotenv from "dotenv";
dotenv.config();
// create app
import express from "express";
const app = express();
// packages
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
// Router imports goes here...
import userRouter from "./routes/userRouter.js";
import testimonialRouter from "./routes/testimonialRouter.js";
import industryRouter from "./routes/Industryroutes.js";
import clientRouter from "./routes/clientRoutes.js";
import videoRouter from "./routes/videoroutes.js";
import teamMemberRouter from "./routes/teamMemberRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import careerRouter from "./routes/careerRoutes.js";
import jobApplicationRouter from "./routes/jobApplicationRoutes.js";
import projectsRouter from "./routes/projectsRoutes.js";
// public
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// middleware
import errorHandlerMiddleware from "./middlewares/errorhandlerMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "http://65.2.42.195",
        "http://ec2-65-2-42-195.ap-south-1.compute.amazonaws.com",
        "https://65.2.42.195",
        "https://ec2-65-2-42-195.ap-south-1.compute.amazonaws.com"
      ]
    : [
        "http://localhost:3000",
        "http://localhost:5173"
      ];
app.use(helmet(({
  crossOriginResourcePolicy: { policy: "cross-origin" } // allow frontend to load images
})));
app.use(mongoSanitize());


// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 300, 
//   standardHeaders: "draft-7",
//   legacyHeaders: false,
// });
// app.use(limiter);


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.json());
app.use(cookieParser());



app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/api/auth", userRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/industries", industryRouter);
app.use("/api/clients", clientRouter);
app.use("/api/videos", videoRouter);
app.use("/api/team-members", teamMemberRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/careers", careerRouter);
app.use("/api/job-applications", jobApplicationRouter);
app.use("/api/projects", projectsRouter);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected successfully");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.error("Server startup error:", error);

  process.exit(1);
}
