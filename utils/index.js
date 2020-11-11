var request = require("request");
module.exports = {
  hans_query(query, req) {
    for (let item in query) {
      if (!item) {
        return true;
      } else {
        if (req.includes(item)) {
          return true;
        }
      }
    }
  },
  http(data){
    return new Promise(resove=>{
      request(data,res=>resove(res),err=>resove(err))
    })
  }
};
