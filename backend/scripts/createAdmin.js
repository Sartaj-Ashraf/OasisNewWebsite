// Usage: node scripts/createAdmin.js <email> <password> [name]
// Creates the user as admin, or promotes + resets the password if the email already exists.
import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import { hashpasword } from "../utils/passwordUtils.js";

const [email, password, name = "Admin"] = process.argv.slice(2);
if (!email || !password || password.length < 8) {
  console.error("Usage: node scripts/createAdmin.js <email> <password (min 8 chars)> [name]");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URL);
const user = await User.findOneAndUpdate(
  { email },
  { name, role: "admin", isVerified: true, password: await hashpasword(password) },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);
console.log(`Admin ready: ${user.email} (${user._id})`);
await mongoose.disconnect();
