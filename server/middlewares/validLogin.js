/**
 * Created by eason on 17/8/5.
 */
'use strict';
module.exports = async (ctx, next) => {
  let timeStamp = ctx.request.body.timeStamp;
  if (timeStamp) {
    let time = parseInt(timeStamp);
    let now = new Date().getTime();
    let timeInterval = now - time;
    if (time && timeInterval < (24*60*60*1000)) {
      next();
    } else {
      ctx.body = {
        result: false,
        msg: '登录超时'
      };
    }
  } else {
    ctx.body = {
      result: false,
      msg: '用户未登录'
    };
  }
};