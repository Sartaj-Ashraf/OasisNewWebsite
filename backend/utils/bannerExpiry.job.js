import cron from "node-cron";
import Banner from "../models/banner.model.js";

cron.schedule("*/5 * * * *", async () => {
    try {
        const now = new Date();

        const result = await Banner.updateMany(
            {
                validUntil: { $lt: now },
                isDeleted: false,
            },
            {
                $set: {
                    isDeleted: true,
                    isActive: false,
                    deletedAt: new Date(),
                },
            }
        );

        if (result.modifiedCount > 0) {
            console.log(`Expired banners cleaned: ${result.modifiedCount}`);
        }

    } catch (error) {
        console.error("Banner expiry cleanup error:", error);
    }
});