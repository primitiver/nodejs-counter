var Gitlab = require("../model/gitlab_model");
var { find, insert, del } = require("../model");
var { success, error } = require("./response");

class GitlabCtrl {
  //获取总数
  async get_gitlab_list(type) {
    try {
      let list = await Gitlab.find({});
      console.log(list)
      return success({ list });
    } catch (err) {
      error(5000, err);
    }
  }
  async save_gitlab_list(data) {
    console.log(data)
    let res = await insert(Gitlab,data);
    console.log(res);
    return success(null, "记录成功");
  }
  async del_gitlab_list(data) {
    let res = await del(Gitlab,data,1);
    console.log(res);
    return success(null, "记录成功");
  }
}

module.exports = new GitlabCtrl();
