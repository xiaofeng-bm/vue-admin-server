const { insert, querySQL } = require("../db/index");


function addHospital(model) {
  console.log('model=', model)
  return insert(model, 'hospital')
}

async function list(model) {
  // const { 
  //   page = 1,
  //   pageSize = 20,
  //   keyword =''
  // } = model;
  const sql = `select * from hospital`;
  let hosList = await querySQL(sql);
  return hosList;
}

module.exports = {
  addHospital,
  list
};
