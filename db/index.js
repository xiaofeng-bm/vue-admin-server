const mysql = require("mysql");
const { host, user, password, database } = require("./config");
const { debug } = require("../utils/constant");
// 连接数据库
function connect() {
  return mysql.createConnection({
    host,
    user,
    password,
    database,
  });
}
// 通用查询
function querySQL(sql) {
  const conn = connect();
  debug && console.log(sql);
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          debug && console.log(`查询失败，原因：${JSON.stringify(err)}`);
          reject(err);
        } else {
          debug && console.log(`查询成功 ${JSON.stringify(result)}`);
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    } finally {
      conn.end();
    }
  });
}


module.exports = {
  querySQL
}