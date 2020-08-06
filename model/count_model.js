var mongoose = require("./db");

let Schema = mongoose.Schema;

let CountSchema = new Schema({
  createTime: String,
  ip: String,
  province: String,
  city: String,
  type: Number,
  platform: String,
});

const Counts = mongoose.model("count", CountSchema);

module.exports = Counts;
