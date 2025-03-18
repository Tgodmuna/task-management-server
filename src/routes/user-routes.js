// @ts-nocheck
const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { upload } = require("../utill/multer");

// Get user profile
router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("tasks");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile", error: err.message });
  }
});

// Update user avatar
router.put("/profile/avatar", upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const avatarPath = `/uploads/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { avatar: avatarPath } },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Avatar updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating avatar", error: err.message });
  }
});

// Serve uploaded images
router.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Image not found" });
  }
});

module.exports = router;
