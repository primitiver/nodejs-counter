var express = require("express");
var count_ctrl = require("../controller/count_ctrl");
var { success, error } = require("../controller/response");
var { hans_query } = require("../utils/index");

var router = express.Router();

router.get("/get-count", async function (req, res, next) {
  console.log(req.query)
  let data = await count_ctrl.get_totle_count();
  res.json(data);
});

//记录
router.get("/save-count", async function (req, res, next) {
  let {type,platform} = req.query
  if (!type||!platform) {
    res.json(error(4001, "缺少必传参数"));
    return;
  }
  let data = await count_ctrl.save_count(req.query);
  res.json(data);
});

//获取数据详情
router.get("/get-totle", async function (req, res, next) {
  if (!req.query.type) {
    res.json(error(4001, "type必传参数"));
    return;
  }
  console.log(req.query);
  let data = await count_ctrl.get_totle(req.query);
  res.json(data);
});
module.exports = router;
