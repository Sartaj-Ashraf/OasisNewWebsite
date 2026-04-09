import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      maxlength: 120,
    },
    profileImage: {
      url: String,
      key: String,
    },

    linkedin: { type: String, trim: true, default: "" },
    instagram: { type: String, trim: true, default: "" },
    website: { type: String, trim: true, default: "" },

    order: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },

    showOnWebsiteOnly: {
      type: String,
      enum: ["all", "portfolio", "website"], // fixed typo
      default: "all",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);


/* ─────────────────────────────────────────────
   ORDER HANDLING (Copied & adapted from Industry)
───────────────────────────────────────────── */
teamMemberSchema.pre("save", async function (next) {
  const Team = this.constructor;

  // Skip if order unchanged
  if (!this.isNew && !this.isModified("order")) return next();

  const desiredOrder = this.order;

  // Auto-assign if new and order not set
  if (this.isNew && desiredOrder === 0) {
    const last = await Team.findOne({ _id: { $ne: this._id } })
      .sort({ order: -1 })
      .select("order")
      .lean();

    this.order = last ? last.order + 1 : 1;
    return next();
  }

  // Shift others down
  await Team.updateMany(
    { _id: { $ne: this._id }, order: { $gte: desiredOrder } },
    { $inc: { order: 1 } }
  );

  next();
});

/* ─────────────────────────────────────────────
   DELETE HANDLING (Compact order)
───────────────────────────────────────────── */
teamMemberSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    const Team = this.constructor;

    await Team.updateMany(
      { order: { $gt: this.order } },
      { $inc: { order: -1 } }
    );
  }
);

/* ─────────────────────────────────────────────
   MODEL EXPORT
───────────────────────────────────────────── */
const TeamMember =
  mongoose.models.TeamMember ||
  mongoose.model("oa-team-members", teamMemberSchema);

export default TeamMember;