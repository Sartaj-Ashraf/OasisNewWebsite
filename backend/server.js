import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// routes
import authRoutes from "./modules/auth/auth.routes.js";
// import heroRoute from "./routes/hero.routes.js";
// import contactRoute from "./routes/contact.routes.js";
// import faqRoute from "./routes/faq.routes.js";
// import testimonialRoute from "./routes/testimonials.routes.js";
// import bannerRoute from "./routes/banner.routes.js";
// import serviceRoute from "./routes/service.routes.js";
// import brandRoute from "./routes/brand.routes.js";
// import orderRoutes from "./routes/order.routes.js";
// import paymentRoutes from "./routes/payment.routes.js";
// import locationRoutes from "./routes/location.routes.js";
// import operationalAreaRoutes from "./routes/operationalArea.routes.js";
// import settingsRoute from "./routes/settings.routes.js";
// import testStripeRoute from "./routes/testStripe.router.js";

// webhook controller
// import { stripeWebhook } from "./controllers/order.controller.js";

// middleware
import { notFound, errorHandler } from "./middleware/error.middleware.js";

// import "./utils/bannerExpiry.job.js";

dotenv.config();

const app = express();


// 🔥 1. STRIPE WEBHOOK (MUST BE FIRST, BEFORE express.json)
// app.post(
//   "/api/orders/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook
// );


// 🔥 2. NORMAL MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
// app.use(mongoSanitize());

app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1000,
  })
);


// 🔥 3. ROUTES
app.use("/api/auth", authRoutes);
// app.use("/api/hero", heroRoute);
// app.use("/api/contact", contactRoute);
// app.use("/api/faq", faqRoute);
// app.use("/api/testimonial", testimonialRoute);
// app.use("/api/banners", bannerRoute);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/services", serviceRoute);
// app.use("/api/brands", brandRoute);
// app.use("/api/operational-areas", operationalAreaRoutes);
// app.use("/api/locations", locationRoutes);
// app.use("/api/settings", settingsRoute);
// app.use("/api/test-stripe", testStripeRoute);
// app.use("/api/orders", orderRoutes);


// 🔥 4. ERROR HANDLING (LAST)
app.use(notFound);
app.use(errorHandler);

console.log(process.memoryUsage());
// 🔥 5. START SERVER
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(" Failed to connect to database");
    process.exit(1);
  }
};

startServer();