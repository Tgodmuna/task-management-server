const multer = require("multer");
const path = require("path");

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars/");
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + path.extname(file.originalname));
  },
});

module.exports.upload = multer({ storage: storage });
