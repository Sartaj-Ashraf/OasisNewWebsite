import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    slug: { type: String, required: true, trim: true, unique: true },

    website: {
      type: String,
      trim: true,
      default: null,
    },

    coverImage: {
      url: String,
      key: String,
    },

    order: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─── Pre-save hook ────────────────────────────────────────────────────────────
clientSchema.pre("save", async function (next) {
  const Client = this.constructor;

  // ───────────────── NEW DOCUMENT ─────────────────
  if (this.isNew) {
    const total = await Client.countDocuments();

    // if order not provided OR invalid
    if (!this.order || this.order < 1 || this.order > total + 1) {
      this.order = total + 1;
      return next();
    }

    // shift others down
    await Client.updateMany(
      {
        order: { $gte: this.order },
      },
      {
        $inc: { order: 1 },
      }
    );

    return next();
  }

  // ───────────────── UPDATE DOCUMENT ─────────────────
  if (this.isModified("order")) {
    const previousOrder = this._previousOrder;

    const total = await Client.countDocuments({
      _id: { $ne: this._id },
    });

    // clamp to max
    if (this.order > total + 1) {
      this.order = total + 1;
    }

    // clamp to min
    if (this.order < 1) {
      this.order = 1;
    }

    // MOVING DOWN
    // example: 2 -> 5
    if (this.order > previousOrder) {
      await Client.updateMany(
        {
          _id: { $ne: this._id },
          order: {
            $gt: previousOrder,
            $lte: this.order,
          },
        },
        {
          $inc: { order: -1 },
        }
      );
    }

    // MOVING UP
    // example: 5 -> 2
    else if (this.order < previousOrder) {
      await Client.updateMany(
        {
          _id: { $ne: this._id },
          order: {
            $gte: this.order,
            $lt: previousOrder,
          },
        },
        {
          $inc: { order: 1 },
        }
      );
    }
  }

  next();
});

export default mongoose.model("oa-portfolio-clients", clientSchema);