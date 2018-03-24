/**
 * Created by eason on 17/8/1.
 */
const config = require('../assests/config');
const mysql = require('mysql');

const connection = mysql.createConnection(config.mysqlInfo);

exports.checkUserLogin = async (email) => {
  return new Promise((resolve, reject) => {
    let sql = "select * from users where email = ?";
    connection.query(sql, [email], (error, result) => {
      resolve(result);
    });
  });
};


