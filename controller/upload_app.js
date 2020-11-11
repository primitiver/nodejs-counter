var path = require("path");
var fs = require("fs");
var { success, error } = require("../controller/response");

var Upload = require("../model/upload_model");
var { find, insert, paging } = require("../model");

var plist = require("../utils/plist");

const baseUrl="https://chandao.derucci.com:6443/node-appdowload/"

module.exports = {
  async upload_app(req) {
    console.log(path)
    console.log(__dirname)
    console.log(req.files)
    let list = [];
    req.files.map((file) => {
      let oldname = file.path;
      let newname =
        file.destination +
        "app/" +
        file.filename +
        path.parse(file.originalname).ext;
      fs.renameSync(oldname, newname);
      list.push({ name: file.fieldname, url:baseUrl+ "app/" +file.filename +path.parse(file.originalname).ext });
    });

    
if( req.body&&req.body.platform=='ios'){
  let {appName} = req.body
  let plistName = +new Date();
  let logo=list.filter(item=>item.name=='logo')
  let logoUrl=logo[0].url
  let app=list.filter(item=>item.name=='appFile')
  let appUrl=app[0].url
  fs.writeFile(
    `upload/app/${plistName}.plist`,
    plist.init(logoUrl, appUrl, appName),
    function (error) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log("写入成功");
    }
  );

  list.push({ name: 'plist', url:baseUrl+ `app/${plistName}.plist` });

}
   

    try {
      let params = req.body;
      params.list = list;
      let res = await insert(Upload, params);
      console.log(res);
      return success({ list });
    } catch (err) {
      error(5000, err);
    }
  },
  async get_app_info(query = {}) {
    try {
      let data = await Upload.find(query);
      return success({ data });
    } catch (err) {
      error(5000, err);
    }
  },
};
