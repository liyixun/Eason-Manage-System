/**
 * Created by eason on 17/7/23.
 */
/**
 * 自定义Api异常
 */
const ApiErrorNames = require('./ApiErrorNames');

class ApiError extends Error{
  //构造方法
  constructor(error_name){
    super();

    let error_info = ApiErrorNames.getErrorInfo(error_name);

    this.name = error_name;
    this.code = error_info.code;
    this.message = error_info.message;
  }
}

module.exports = ApiError;
