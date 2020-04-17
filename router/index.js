/*
 * @Description: 路由主文件
 * @Author: 晓枫
 * @Date: 2020-04-15 09:51:18
 * @LastEditTime: 2020-04-15 17:29:36
 */
const express = require("express");
const boom = require("boom");
const userRouter = require("./user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "一个使用vue、element-ui、typescript、express技术栈开发的后台管理系统"
  );
});
router.use("/user", userRouter);

module.exports = router;
