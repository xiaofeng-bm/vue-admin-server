const express = require("express");
const Result = require("../models/Result");
const boom = require("boom");
const jwtAuth = require("../utils/jwt_auth");
const {
  addHospital,
  list,
  delHosp,
  HospDetail,
  editHosp,
} = require("../service/hospital");

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
        config: [
          { type: "selection", 'reserve-selection': true },
          { label: "医院编码", prop: "hosCode" },
          { label: "医院名称", prop: "hosName" },
          { label: "行政级别", prop: "level" },
          { label: "省份", prop: "province" },
          { label: "市区", prop: "city" },
          { label: "地址", prop: "address" },
        ],
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
  delHosp(query.hosCode)
    .then(() => {
      new Result(null, "删除成功", { message: "删除成功" }).success(res);
    })
    .catch((err) => {
      console.log("/hospital/del", err);
      next(boom.badImplementation(err));
    });
});

// 获取医院详情
router.get("/detail", (req, res, next) => {
  let query = req.query;
  HospDetail(query.hosCode)
    .then((info) => {
      new Result(info, "查询成功").success(res);
    })
    .catch((err) => {
      console.log("/hospital/detail", err);
      next(boom.badImplementation(err));
    });
});

// 编辑保存
router.post("/edit", (req, res, next) => {
  let query = req.body;
  editHosp(query)
    .then(() => {
      new Result(null, "保存成功", { message: "保存成功" }).success(res);
    })
    .catch((err) => {
      console.log("/hospital/edit", err);
      next(boom.badImplementation(err));
    });
});

module.exports = router;
