var express = require("express");
var count_ctrl = require("../controller/count_ctrl");
var images_ctrl = require("../controller/images_ctrl");
var { success, error } = require("../controller/response");
var { hans_query } = require("../utils/index");
var request = require("request");

var router = express.Router();

router.get("/get-count", async function (req, res, next) {
  console.log(req.query);
  let data = await count_ctrl.get_totle_count();
  res.json(data);
});

//记录
router.get("/save-count", async function (req, res, next) {
  let { type, platform } = req.query;
  if (!type || !platform) {
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

//获取数据详情
router.post("/git-push-data", async function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  let project = req.body.project;
  let { name, git_http_url } = project;
  let { object_kind, ref, user_name, message, commits = [{}] } = req.body;

  let url = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${req.query.key}`;
  let body = `{ 
    "msgtype": "text",
    "text":{
      "content": "${name}更新:
status：${object_kind}
branch：${ref}
url：${git_http_url}
更新人：${user_name}
更新内容：${commits[0].message || "-"}",
     
    }
  }`;

  //项目名称：${name}
  //url：${git_ssh_url}
  //更新内容：${commits[0].message||'-'}
  //${ref.includes('release')?'预生产环境':'生产环境更新'}
  // "mentioned_mobile_list":["16603869908","15820874327","13532855589"]

  if (object_kind == "tag_push") {
    url =
      "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=e442ec4b-d0bc-44af-a9db-fa2d53688e0f";
    body = `{ 
      "msgtype": "text",
      "text":{
        "content": "${
          ref.includes("release") ? "预生产环境" : "生产环境更新"
        }\n更新时间：立刻更新\n发布人：${user_name}\n ${name}更新：\n${message}\n 版本：${ref.replace(
      "refs/tags/",
      ""
    )}",
        "mentioned_mobile_list":["16603869908","15820874327","13532855589"]
      }
    }`;
  }

  request(
    {
      url,
      method: "post",
      body,
    },
    (res) => {
      console.log("发送成功");
    },
    (err) => {
      console.log("发送失败");
    }
  );
  res.json({ status: 200 });
});

//获取数据详情
router.get("/get-images", async function (req, res, next) {
  let data = await images_ctrl.get_images(req.query);
  res.json(data);
});

module.exports = router;
