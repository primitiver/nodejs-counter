var express = require("express");
var count_ctrl = require("../controller/count_ctrl");
var images_ctrl = require("../controller/images_ctrl");
var gitlab_ctrl = require("../controller/gitlab");
// var {upload_app,get_app_info} = require("../controller/upload_app")

var { success, error } = require("../controller/response");
var { hans_query,http } = require("../utils/index");


// var multer  = require('multer');
// var upload = multer({dest: 'upload/'});

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
  let { name, git_http_url } = req.body.project;
  let { object_kind, ref, user_name,project_id, message,checkout_sha, commits = [{}] } = req.body;
  console.log('checkout_sha:'+checkout_sha)
  if (object_kind == "push") {
    let url = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${req.query.key}`;
    let msg=''
    commits.map((item,index)=>{
      if(commits.length>1){
        msg+=`${index+1}.${item.message}`
      }else{
        msg+=item.message
      }
    })
    let body = `{ 
      "msgtype": "text",
      "text":{
        "content": "${name}更新:\nstatus：${object_kind}\nbranch：${ref}\nurl：${git_http_url}\n更新人：${user_name}\n更新内容：\n${msg}"}
      }`;
     let res_com= await http( { url, method: "post", body })
     console.log(res_com)

  }

  //项目名称：${name}
  //url：${git_ssh_url}
  //更新内容：${commits[0].message||'-'}
  //${ref.includes('release')?'预生产环境':'生产环境更新'}
  // "mentioned_mobile_list":["16603869908","15820874327","13532855589"]
  //'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=7bda2f0f-e0dc-442e-b060-c133ebd19e49'
  //${
  //  ref.includes("release") ? "预生产环境" : "生产环境更新"
  //}
  if (object_kind == "tag_push") {
    let url ="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=e442ec4b-d0bc-44af-a9db-fa2d53688e0f";
    if(ref.includes("release")){
      var refs = ref.replace("refs/tags/", "");
      var versionObj = {
        "84": "release-app-download-5a5365e6a70e972bc3e3",
        "53": "release-consumer-6905a230a5755bf30419",
        "97": "release-dealer-2b840b6288701d2fa223",
        "39": "release-derucci-app-h5-a3d0b156cfe4ebfb176d",
        "1": "release-marketing-h5-1fb285f7912677780c17",
        "54": "release-television-fb18609cbcb15c7b414f",
        "92":"release_admin-consumer-ccee37d33ba536ae55e0"
      };
      let list_res=await gitlab_ctrl.get_gitlab_list({})
      let token=''
      let gitlab= list_res.data.list.filter(item=>item.gitlab_id==project_id)[0]
      console.log(gitlab)
      if(gitlab){
          token=gitlab.release_version
      }else{
        token=versionObj[project_id]
      }
      console.log(token)
      // var temp = refs.split("_v")[0];
      let params={
                  url: "http://47.98.152.82:8088/generic-webhook-trigger/invoke" + "?token=" + token,
                  method: "post", 
                  headers: { "content-type": "application/json", }, 
                  body: JSON.stringify({ ref: refs, versionname: user_name })
                }
      let body=`{ 
          "msgtype": "text",
          "text":{"content": "预生产环境更新\n${message}"}
        }`;
        console.log(message)

   
    let res_com= await http( { url, method: "post", body })
    console.log(url,body)
    console.log(res_com)

      let res_tag= await http(params)
      console.log(res_tag)
      res.json({status:200})
      return
    }


    
    if(!checkout_sha){
      console.log('删除一个tag',user_name)
       return
    }

    let body = `{ 
      "msgtype": "text",
      "text":{
        "content": "生产环境更新\n更新时间：立即更新\n发布人：${user_name}\n ${name}更新：\n${message}\n 版本：${ref.replace(
      "refs/tags/",
      ""
    )}",
        "mentioned_mobile_list":["16603869908","15807692963","13532855589"]
      }
    }`;

    let res_master= await http( { url, method: "post", body })
    console.log(res_master)
  }
  res.json({status:200})
});

//获取数据详情
router.get("/get-images", async function (req, res, next) {
  let data = await images_ctrl.get_images(req.query);
  res.json(data);
});

//上传app
// router.post("/upload-app", upload.any(),async function (req, res, next) {
//   let key='4eefb138b99e6964'
//   if(key!==req.query.key){
//     res.json(error(5000,'秘钥校验不正确'));
//     return
//   }

//   let data= await upload_app(req)

//   res.json(data)

// });

//查看app
router.get("/get-app-info", async function (req, res, next) {
  let data = await get_app_info(req.query);
  res.json(data);
});


router.get('/get-gitlab-list',async (req,res)=>{
  let list_res=await gitlab_ctrl.get_gitlab_list({})
  res.send(list_res)
})

router.get('/save-gitlab-list',async (req,res)=>{
  let list_res=await gitlab_ctrl.save_gitlab_list(req.query)
  console.log(list_res)
  res.send({status:200})
})

router.get('/del-gitlab-list',async (req,res)=>{
  let list_res=await gitlab_ctrl.del_gitlab_list({gitlab_id:'92'})
  console.log(list_res)
  res.send({status:200})
})

module.exports = router;
