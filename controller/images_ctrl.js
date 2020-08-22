const request = require("request");
const cheerio = require('cheerio')
var { success, error } = require("./response");
module.exports = {
  get_images(query){
    return new Promise((resolve,reject)=>{
      let url=`https://sj.enterdesk.com/${query.page}.html`
      query.type&&(url=`https://sj.enterdesk.com/${query.type}/${query.page}.html`)
      request(url,(err,res,body)=>{
        const $ = cheerio.load(body)
        let data=[]
        $('.egeli_pic_li').each((index,item) => {
          let src=$(item).find('img').attr('src')
          src=src.replace(/_360_360/g,"")
          let title=$(item).find('dt a').text()
          src&&data.push({src,title})
        });
        resolve(success(data))
      })
    })
  }
};