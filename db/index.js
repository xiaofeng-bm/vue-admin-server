const mysql = require("mysql");
const { host, user, password, database } = require("./config");
const { debug } = require("../utils/constant");
const { isObject } = require("../utils/index");
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

// 插入
function insert(model, tableName) {
  return new Promise((resolve, reject) => {
    if (!isObject(model)) {
      reject(new Error("插入数据失败，插入数据必须为对象"));
    } else {
      const keys = [];
      const values = [];
      Object.keys(model).forEach((key) => {
        keys.push(`\`${key}\``);
        values.push(`'${model[key]}'`);
      });

      if (keys.length > 0 && values.length > 0) {
        let sql = `INSERT INTO \`${tableName}\`(`;
        const keysString = keys.join(",");
        const valuesString = values.join(",");
        sql = `${sql}${keysString}) VALUES (${valuesString})`;
        const conn = connect();
        console.log('sql=', sql)
        try {
          conn.query(sql, (err, result) => {
            if(err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
        } catch (error) {
          reject(error)
        } finally {
          conn.end();
        }
      } else {
        reject(new Error("SQL解析失败"));
      }
    }
  });
}

function andLike(where, k, v) {
  if (where === 'where') {
    return where + ` ${k} like '%${v}%'`
  } else {
    return where + ` and ${k} like '%${v}%'`
  }
}

function and(where, k, v) {
  if (where === 'where') {
    return where + ` ${k}='${v}'`
  } else {
    return where + ` and ${k}='${v}'`
  }
}

module.exports = {
  querySQL,
  queryOne,
  insert,
  andLike,
  and
};
