/*
 * @Description: 路由主文件
 * @Author: 晓枫
 * @Date: 2020-04-15 09:51:18
 * @LastEditTime: 2020-05-08 16:45:41
 */
const express = require("express");
const boom = require("boom");
const userRouter = require("./user");
const hospitalRouter = require("./hospital");
const provinceRouter = require("./province");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "一个使用vue、element-ui、typescript、express技术栈开发的后台管理系统"
  );
});
router.use("/user", userRouter);
router.use("/hospital", hospitalRouter);
router.use("/province", provinceRouter);

module.exports = router;
