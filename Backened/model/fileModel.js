const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  path: { type: String, required: true },
  name: { type: String, required: true },
});
const fileModel = mongoose.model("file", fileSchema);
module.exports = fileModel;
