import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      maxlength: [50, "Email must be less than 50 characters"],
      required: [true, "Email is required"],
    },

    phoneNumber: {
      type: String,
      trim: true,
      maxlength: [15, "Phone must be less than 15 characters"],
      required: [true, "Phone is required"],
    },

    message: {
      type: String,
      trim: true,
      maxlength: [500, "Message must be less than 500 characters"],
      required: [true, "Message is required"],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;