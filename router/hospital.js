const express = require("express");
const Result = require("../models/Result");
const boom = require("boom");
const jwtAuth = require("../utils/jwt_auth");
const { addHospital, list, delHosp } = require("../service/hospital");

const router = express.Router();

// token校验
router.use(jwtAuth);

// 新增医院
router.post("/add", (req, res, next) => {
  let model = req.body;
  addHospital(model)
    .then(() => {
      new Result("新增成功").success(res);
    })
    .catch((err) => {
      console.log("/hospital/add", err);
      next(boom.badImplementation(err));
    });
});

// 获取列表数据
router.get("/list", (req, res, next) => {
  let query = req.query;
  list(query)
    .then(({ list, total }) => {
      const config = {
        config: {
          show: [
            "id",
            "hosCode",
            "hosName",
            "level",
            "province",
            "city",
            "address",
          ],
          title: {
            id: {
              label: "ID",
              align: "center",
              width: 55,
            },
            hosCode: {
              label: "医院编码",
            },
            hosName: {
              label: "医院名称",
              width: 200,
            },
            level: {
              label: "行政等级",
            },
            province: "省份",
            city: "城市",
            address: {
              label: "地址",
              width: 400,
            },
          },
        },
        table: list,
      };
      new Result(
        {
          config,
          page: Number(query.page),
          limit: Number(query.limit),
          total: total,
        },
        "查询成功"
      ).success(res);
    })
    .catch((err) => {
      console.log("/hospital/list", err);
      next(boom.badImplementation(err));
    });
});

// 删除
router.post("/del", (req, res, next) => {
  let query = req.body;
  delHosp(query.id)
    .then(() => {
      new Result(null, "删除成功", { message: '删除成功' }).success(res);
    })
    .catch((err) => {
      console.log("/hospital/del", err);
      next(boom.badImplementation(err));
    });
});

module.exports = router;
