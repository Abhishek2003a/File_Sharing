const fileModel = require("../model/fileModel.js");
module.exports = async function DownloadController(req, res) {
  try {
    const file = await fileModel.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    return res.download(file.path, file.name);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
