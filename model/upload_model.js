var mongoose = require("./db");

let Schema = mongoose.Schema;

let UploadSchema = new Schema({
  createTime: Number,
  list: Array,
  version: String,
  size: Number,
  appName: String,
  platform: String,
});

const Upload = mongoose.model("upload", UploadSchema);

module.exports = Upload;
