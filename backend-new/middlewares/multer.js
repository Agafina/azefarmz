const multer = require("multer");
const path = require("path");

// Set up the multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Set unique filenames based on timestamp
  },
});

// File filter function (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Allow the file
  } else {
    cb(new Error("Invalid file type. Only JPEG and PNG are allowed"), false); // Reject the file
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
