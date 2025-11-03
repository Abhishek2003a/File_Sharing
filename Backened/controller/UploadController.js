const fileModel = require("../model/fileModel.js");
module.exports = async function UploadController(req, res) {
  try {
    const fileObject = {
      path: req.file.path,
      name: req.file.originalname,
    };
    const file = await fileModel.create(fileObject);
    return res
      .status(200)
      .json({ path: `http://localhost:9000/files/${file.id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
