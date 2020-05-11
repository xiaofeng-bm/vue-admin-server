const {
  insert,
  querySQL,
  andLike,
  and,
  queryOne,
  update,
} = require("../db/index");

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

function delHosp(id) {
  const sql = `delete from hospital where id='${id}'`;
  return querySQL(sql);
}

async function HospDetail(code) {
  // 先查询相应的hosp信息，在根据province查询对应的
  const hopsSql = `select * from hospital where hosCode='${code}'`;
  const hospInfo = await queryOne(hopsSql);
  const provinceSql = `select * from province`;
  const provinceList = await querySQL(provinceSql);
  // 查询城市信息
  const citySql = `select * from province p inner join city c on p.province=c.province where p.name='${hospInfo.province}'`;
  const cityList = await querySQL(citySql);
  return new Promise((resolve, reject) => {
    resolve({ hospInfo, provinceList, cityList });
  });
}

function editHosp(model) {
  return update(model, 'hospital', `where hosCode='${model.hosCode}'`)
}

module.exports = {
  addHospital,
  list,
  delHosp,
  HospDetail,
  editHosp
};
