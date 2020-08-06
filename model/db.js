var mongoose = require("mongoose");

var options = {
  db_user: "localhost", //添加的普通账户名
  db_pwd: "",
  db_host: "127.0.0.1",
  db_port: 27017,
  db_name: "test", //数据库名称
  useNewUrlParser: true,
};

// var dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
// var dbURL = "mongodb://60.205.0.3:27017/derucci-consumer";
var dbURL = "mongodb://127.0.0.1:27017/derucci-consumer";
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }); // 连接数据库

mongoose.connection.on("connected", () => {
  console.log("连接成功");
});

/**
 * 连接异常
 */
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose connection disconnected");
});

module.exports = mongoose;
