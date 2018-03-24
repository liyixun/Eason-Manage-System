/**
 * Created by eason on 17/7/23.
 */
/**
 * API错误名称
 */
var ApiErrorNames = {};

ApiErrorNames.UNKNOWN_ERR = "unknownError";
ApiErrorNames.USER_NOT_EXIST = "userNoExist";

/**
 * API错误名称对应的错误信息
 */
const error_map = new Map();

error_map.set(ApiErrorNames.UNKNOWN_ERR, {code: -1, message: '未知错误'});
error_map.set(ApiErrorNames.USER_NOT_EXIST, {code: 101, message: '用户不存在'});

//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (error_name) => {
  var error_info;
  if(error_name){
    error_info = error_map.get(error_name);
  }

  //如果没有对应的错误信息，默认'未知错误'
  if(!error_info){
    error_name = ApiErrorNames.UNKNOWN_ERR;
    error_info = error_map.get(error_name);
  }
  return error_info;
};


module.exports = ApiErrorNames;