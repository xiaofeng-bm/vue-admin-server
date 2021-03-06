const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("./constant");

// 解码
function decode(req) {
  const authorization = req.get("Authorization");
  let token = "";
  if (authorization.indexOf("Bearer") >= 0) {
    token = authorization.replace("Bearer ", "");
  } else {
    token = authorization;
  }
  return jwt.verify(token, PRIVATE_KEY);
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

module.exports = {
  decode,
  isObject
};
