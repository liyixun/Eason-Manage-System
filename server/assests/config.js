/**
 * Created by eason on 17/3/5.
 */
exports.mysqlInfo = {
  host : '127.0.0.1',
  user : 'root',
  password : 'xxxxxx',                      // todo 这里改为自己本地MySQL的密码
  database : 'EMS',                         // todo 这里改为自己MySQL对应数据库的名称
  port : '3306'
};

exports.mongodbInfo = {
  url: 'mongodb://localhost:27017/EMS'      // todo 这里改为自己本地MongoDB的url
};

exports.demoModelConstant = {               // 这里设置不同开发模式下的常量
  DEMO_MODEL: 'DEMO',
  DEVELOP_MODEL: 'DEVELOP',
  DEMO_MODEL_EMAIL: 'guest',
  DEMO_MODEL_PW: 'guest',
  DEMO_MODEL_USERNAME: '客人用户'
};
