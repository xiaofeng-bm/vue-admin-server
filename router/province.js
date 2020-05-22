const express = require("express");
const Result = require("../models/Result");
const boom = require("boom");
const jwtAuth = require("../utils/jwt_auth");
const { getProvince, getCity } = require("../service/province");

const router = express.Router();

// token校验
router.use(jwtAuth);

router.get("/province", (req, res, next) => {
  getProvince().then((province) => {
    if (province && province.length > 0) {
      new Result(province, "省份信息查询成功").success(res);
    } else {
      new Result("查询失败").fail(res);
    }
  });
});


router.get('/city', (req, res, next) => {
  getCity(req.query.province).then(city => {
    new Result(city, '城市信息查询成功').success(res);
  })
})
module.exports = router;
