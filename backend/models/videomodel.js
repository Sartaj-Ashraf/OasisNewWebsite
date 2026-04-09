import mongoose from "mongoose";

const PLATFORMS = ["instagram", "youtube", "facebook", "tiktok", "twitter", "linkedin", "other"];

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    thumbnail: { url: String, key: String },
    video: { url: String, key: String },
    platform: {
      type: String,
      enum: PLATFORMS,
      required: true,
    },
    sourceUrl: { type: String, trim: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "oa-portfolio-clients",
      default: null,
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─── Pre-save hook ────────────────────────────────────────────────────────────
videoSchema.pre("save", async function (next) {
  const Video = this.constructor;
  const currentClient = this.client ?? null;

  const clientChanged =
    this.isModified("client") &&
    !this.isNew &&
    String(this._previousClient ?? null) !== String(currentClient);

  // ── CASE 1: client changed → compact old group, append to end of new group
  if (clientChanged) {
    const oldClient = this._previousClient ?? null;
    const oldOrder = this._previousOrder ?? 0;

    await Video.updateMany(
      { _id: { $ne: this._id }, client: oldClient, order: { $gt: oldOrder } },
      { $inc: { order: -1 } }
    );

    const last = await Video.findOne({ _id: { $ne: this._id }, client: currentClient })
      .sort({ order: -1 })
      .select("order")
      .lean();

    this.order = last ? last.order + 1 : 1;
    return next();
  }

  // ── CASE 2: new doc with default order=0 → auto-assign to end of its group
  if (this.isNew && this.order === 0) {
    const last = await Video.findOne({ _id: { $ne: this._id }, client: currentClient })
      .sort({ order: -1 })
      .select("order")
      .lean();

    this.order = last ? last.order + 1 : 1;
    return next();
  }

  // ── CASE 3: order explicitly set/changed → shift only within the same group
  if (this.isNew || this.isModified("order")) {
    await Video.updateMany(
      { _id: { $ne: this._id }, client: currentClient, order: { $gte: this.order } },
      { $inc: { order: 1 } }
    );
  }

  next();
});

// ─── Post-delete: compact only within the same client group ──────────────────
videoSchema.post("deleteOne", { document: true, query: false }, async function () {
  const Video = this.constructor;
  await Video.updateMany(
    { client: this.client ?? null, order: { $gt: this.order } },
    { $inc: { order: -1 } }
  );
});

export default mongoose.model("oa-portfolio-videos", videoSchema);