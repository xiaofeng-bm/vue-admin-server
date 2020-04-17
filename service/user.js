const { querySQL, queryOne } = require("../db/index");

function login(username) {
  const sql = `select * from admin_user where username='${username}'`;
  return querySQL(sql);
}

function findUser(username) {
  const sql = `select id, username, role, name from admin_user where username='${username}'`;
  return queryOne(sql);
}

module.exports = {
  login,
  findUser
};
