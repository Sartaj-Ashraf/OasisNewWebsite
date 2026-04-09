import TeamMember from "../models/teamMemberModel.js";
import { uploadToS3, deleteFromS3 } from "../utils/s3Upload.js";

// ─── CREATE ───────────────────────────────────────────────────────────────────
export const createTeamMember = async (req, res) => {

  console.log(req.body);
  const { name, designation, linkedin, instagram, website, isActive, showOnWebsiteOnly } = req.body;

  if (!name || !designation) return res.status(400).json({ success: false, message: "Name and Designation are required" });
  if (linkedin && !linkedin.startsWith("https://")) return res.status(400).json({ success: false, message: "LinkedIn must be a valid URL" });
  if (instagram && !instagram.startsWith("https://")) return res.status(400).json({ success: false, message: "Instagram must be a valid URL" });
  if (website && !website.startsWith("https://")) return res.status(400).json({ success: false, message: "Website must be a valid URL" });

  const profileImage = req.file ? await uploadToS3(req.file, "team-members") : {};
  const teamMember = await TeamMember.create({
    name,
    designation,
    profileImage,
    linkedin,
    instagram,
    website,
    isActive: isActive !== undefined ? isActive : true,
    showOnWebsiteOnly: showOnWebsiteOnly || "all",
  });

  res.status(201).json({ success: true, data: teamMember });

};

// ─── GET ALL (no pagination) ──────────────────────────────────────────────────
export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ order: 1 });
    res.json({ success: true, data: teamMembers });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── GET ONE BY ID ────────────────────────────────────────────────────────────
export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }
    const count = await TeamMember.countDocuments();
    const positions = Array.from({ length: count }, (_, i) => i + 1);
    res.json({ success: true, data: teamMember, positions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────
export const updateTeamMember = async (req, res) => {
  try {
    const { name, designation, linkedin, instagram, website, order, isActive, showOnWebsiteOnly } = req.body;

    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    if (req.file) {
      if (teamMember.profileImage?.key) await deleteFromS3(teamMember.profileImage.key);
      teamMember.profileImage = await uploadToS3(req.file, "team-members");
    }

    if (name !== undefined) teamMember.name = name;
    if (designation !== undefined) teamMember.designation = designation;
    if (linkedin !== undefined) teamMember.linkedin = linkedin;
    if (instagram !== undefined) teamMember.instagram = instagram;
    if (website !== undefined) teamMember.website = website;
    if (isActive !== undefined) teamMember.isActive = isActive;
    if (showOnWebsiteOnly !== undefined) teamMember.showOnWebsiteOnly = showOnWebsiteOnly;

    // Assign order last — triggers pre-save hook to shift others
    if (order !== undefined) teamMember.order = Number(order);

    await teamMember.save();

    res.json({ success: true, data: teamMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────────────────────────
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    if (teamMember.profileImage?.key) await deleteFromS3(teamMember.profileImage.key);

    await teamMember.deleteOne();

    res.json({ success: true, message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};