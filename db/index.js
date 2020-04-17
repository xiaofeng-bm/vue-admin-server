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
// 单个查询
function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySQL(sql)
      .then((result) => {
        if (result && result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  querySQL,
  queryOne
};
