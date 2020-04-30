const express = require("express");
const Result = require("../models/Result");
const jwtAuth = require("../utils/jwt_auth");
const { addHospital, list } = require('../service/hospital')

const router = express.Router();

// token校验
router.use(jwtAuth);

// 新增医院
router.post('/add', (req, res, next) => {
  let model = req.body;
  addHospital(model).then(() => {
    new Result('新增成功').success(res);
  })
});

router.get('/list', (req, res, next) => {
  list().then(list => {
    console.log('dsadsa')
    new Result({ list }, '查询成功').success(res)
  })
})

module.exports = router;