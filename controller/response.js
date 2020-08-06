module.exports={
  success(body,msg='成功！'){
    return {
      code:0, //如果成功是0，失败返回响应错误代码
      data:body,
      msg,
      status:1 //如果查询成功状态是1 失败是0
    }
  },
  error(code,msg="未知错误"){
    return  {
      code, //如果成功是0，失败返回响应错误代码
      data:null,
      msg,
      status:0 //如果查询成功状态是1 失败是0
    }
  }
}