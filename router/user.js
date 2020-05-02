const express = require("express");
const { login, findUser } = require("../service/user");
const Result = require("../models/Result");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, JWT_EXPIRED } = require("../utils/constant");
const jwtAuth = require("../utils/jwt_auth");
const { decode } = require("../utils/index");

const router = express.Router();

// token校验
router.use(jwtAuth);

router.post("/login", (req, res, next) => {
  //todo
  let { username, password } = req.body;
  login(username).then((user) => {
    if (!user || user.length === 0) {
      new Result("用户名或密码错误，请重新登录").fail(res);
    } else {
      const token = jwt.sign({ username }, PRIVATE_KEY, {
        expiresIn: JWT_EXPIRED,
      });

      new Result({ token }, "登录成功").success(res);
    }
  });
});

router.post("/info", (req, res, next) => {
  const decodeInfo = decode(req); // token解析 { username: 'admin', iat: 1587030669, exp: 1587034269 }
  if (decodeInfo && decodeInfo.username) {
    findUser(decodeInfo.username).then((user) => {
      if (user) {
        user.roles = [user.role];
        new Result(user, "用户信息查询成功").success(res);
      } else {
        new Result("用户信息查询失败，请重新登录").fail(res);
      }
    });
  } else {
    new Result("用户信息解析失败").fail(res);
  }
});

module.exports = router;
