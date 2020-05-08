const { querySQL } = require("../db/index");

function getProvince() {
  const sql = `select * from province`;
  return querySQL(sql);
}

function getCity(province) {
  const sql = `select * from city where province='${province}'`;
  return querySQL(sql);
}

module.exports = {
  getProvince,
  getCity
};
