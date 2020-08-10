var Counts = require("../model/count_model");
var { find, insert, paging } = require("../model");
var { success, error } = require("./response");

class CountCtrl {
  //获取总数
  async get_totle_count(type) {
    try {
      let count = await Counts.find({ type }).countDocuments();
      return success({ count });
    } catch (err) {
      error(5000, err);
    }
  }

  async get_totle({ type,platform, limit = 10, page = 0 }) {
    try {
      let params={type}
      if(platform) params.platform=platform
console.log(params)
      let list = await paging(Counts, params, {}, parseInt(limit), page);
      let count = await Counts.find(params).countDocuments();
      // let list = await find(Counts, { type });
      return success({ list, totle: count });
    } catch (err) {
      error(5000, err);
    }
  }

  async save_count(data) {
    let res = await insert(Counts, data);
    console.log(res);
    return success(null, "记录成功");
  }
}

module.exports = new CountCtrl();
