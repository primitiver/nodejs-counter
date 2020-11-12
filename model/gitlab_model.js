var mongoose = require("./db");

let Schema = mongoose.Schema;

let GitlabSchema = new Schema({
  gitlab_id: String,
  release_version: String,
  tips:String
});

const Gitlab = mongoose.model("gitlab", GitlabSchema);

module.exports = Gitlab;
