const { insert, querySQL, andLike, and } = require("../db/index");

function addHospital(model) {
  return insert(model, "hospital");
}

async function list(model) {
  const { page = 1, limit = 20, hosName, province, city } = model;

  const offset = (page - 1) * limit;
  let bookSql = "select * from hospital";
  let where = "where";

  hosName && (where = andLike(where, "hosName", hosName));
  province && (where = andLike(where, "province", province));
  city && (where = andLike(where, "city", city));

  if (where !== "where") {
    bookSql = `${bookSql} ${where}`;
  }

  bookSql = `${bookSql} limit ${limit} offset ${offset}`;

  let countSql = `select count(*) as count from hospital`;
  if (where !== "where") {
    countSql = `${countSql} ${where}`;
  }

  let hosList = await querySQL(bookSql);
  let total = await querySQL(countSql);
  return { list: hosList, total: total[0].count };
}

module.exports = {
  addHospital,
  list,
};
