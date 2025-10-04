import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // 1. File extension nikalo
    const ext = path.extname(file.originalname);

    // 2. Original name ko sanitize karo (spaces, brackets hatao)
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")       // spaces -> underscore
      .replace(/[()]/g, "")       // remove brackets
      .replace(/[^a-zA-Z0-9_-]/g, ""); // only safe chars

    // 3. Unique name banao (timestamp + sanitized name)
    cb(null, `${Date.now()}_${baseName}${ext}`);
  },
});

const upload = multer({ storage: storage });

export { upload };
