/**
 * Created by eason on 17/7/23.
 */
const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const modelConstants = require('../assests/config').demoModelConstant;
const usersDao = require('../dao/users.dao');
const db = require('../dao/mongo');
const moment = require('moment');
const _ = require('lodash');

//获取用户
exports.getUser = async (ctx, next) => {
  ctx.body = {
    username: 'eason',
    age: 22
  }
};

// exports.getUser = function*(next) {
//   var ctx = this;
//   try {
//     this.body = { err: false, state: 1,count:365 };
//   } catch (error) {
//     this.logger.error(error);
//     ctx.body = {
//       username: 'eason',
//       age: 22
//     }
//   }
// };

//用户注册
exports.registerUser = async (ctx, next) => {
  console.log('registerUser', ctx.request.body);
  ctx.body = {
    result: 'success'
  }
};

/**
 * 登录的时候先判断模式，如果是DEMO模式的话就直接判断和常量是否相等，相等就通过
 * 如果是开发者模式的话，就查询数据库中的账号密码，校验成功向MongoDB中插入一条登录记录
 */
exports.checkUserLogin = async (ctx, next) => {
  let email = ctx.request.body.email;
  let password = ctx.request.body.password;
  let openModel = ctx.request.body.openModel;
  if (openModel === modelConstants.DEMO_MODEL && email === modelConstants.DEMO_MODEL_EMAIL && password === modelConstants.DEMO_MODEL_PW) {
    ctx.body = {
      result: true,
      userInfo: {
        email: email,
        userName: modelConstants.DEMO_MODEL_USERNAME
      }
    }
  } else {
    let result = await usersDao.checkUserLogin(email);
    if (result && result.length) {
      if (email === result[0].email && password === result[0].password) {
        let dateStamp = moment(new Date()).format('YYYY-MM-DD HH:mm:SS');
        // let collection = db.getDataDB().collection('UserLoginRecord');
        // collection.insertOne({
        //   "email": email,
        //   "loginTime": dateStamp
        // }, (err, result) => {
        //
        // });
        let insertData = {
          "email": email,
          "loginTime": dateStamp
        };
        db.insertUserLoginRecord(insertData);
        ctx.body = {
          result: true,
          userInfo: {
            email: email,
            userName: result[0].username
          }
        }
      } else if (email === result[0].email && password !== result[0].password) {
        ctx.body = {
          result: false,
          msg: 'errorPW'
        }
      } else {
        ctx.body = {
          result: false
        }
      }
    } else {
      ctx.body = {
        result: false,
        msg: 'emailNoExist'
      }
    }
  }
};

exports.checkSession = async (ctx, next) => {
  ctx.body = {
    result: true
  };
};

exports.queryProvinceByKeyword = async (ctx, next) => {
  let regionList = ctx.request.body.regionList;
  let provinceTypeList = ctx.request.body.provinceTypeList;
  let cityData = require('../dao/citys.json');
  let result = _.filter(cityData, function (item) {
    let regionResult = _.findIndex(regionList, function (region) {
      return item.region === region;
    });
    let provinceTypeResult = _.findIndex(provinceTypeList, function (provinceType) {
      return item.type === provinceType;
    });
    if (!regionList || !regionList.length) {                //不传区域的时候
      return -1 !== provinceTypeResult;
    }
    if (!provinceTypeList || !provinceTypeList.length) {                //不传省份类型的时候
      return -1 !== regionResult;
    }
    if (regionList && regionList.length && provinceTypeList && provinceTypeList.length) {
      return -1 !== regionResult && -1 !== provinceTypeResult;
    }
  });
  ctx.body = result;
};

exports.queryCityByProvinceList = async (ctx, next) => {
  let provinceList = ctx.request.body.provinceList;
  let result = [];
  let cityData = require('../dao/citys.json');
  if (provinceList && provinceList.length) {
    _.forEach(cityData, (item) => {
      let isSelected = _.findIndex(provinceList,  (province) => {
        return province === item.province;
      });
      if (isSelected !== -1) {
        result = _.union(result, item.city);
      }
    });
  } else {
    _.forEach(cityData, (item) => {
      result = _.union(result, item.city);
    });
  }

  ctx.body = result;
};
