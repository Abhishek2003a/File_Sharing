const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.js");
const UploadController = require("../controller/UploadController.js");
const DownloadController = require("../controller/DownloadController.js");
router.post("/upload", upload.single("file"), UploadController);
router.get("/files/:id", DownloadController);
module.exports = router;