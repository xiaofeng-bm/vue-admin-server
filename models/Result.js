const {
  CODE_ERROR,
  CODE_SUCCESS,
  CODE_TOKEN_EXPIRED,
  debug,
} = require("../utils/constant");

class Result {
  constructor(data, msg, options) {
    this.data = null;
    if (arguments.length === 1) {
      this.msg = data;
    } else {
      this.data = data;
      this.msg = msg;

      if (this.options) {
        this.options = options;
      }
    }
  }

  createResult() {
    // 状态码为空，默认成功
    if (!this.code) {
      this.code = CODE_SUCCESS;
    }
    // 基础返回值
    let base = {
      code: this.code,
    };
    if (this.data) {
      base["data"] = this.data;
    }
    if (this.msg) {
      base["msg"] = this.msg;
    }
    if (this.options) {
      base = { ...base, ...this.options };
    }
    debug && console.log(base);
    return base;
  }

  json(res) {
    res.json(this.createResult());
  }

  success(res) {
    this.code = CODE_SUCCESS;
    this.json(res);
  }

  fail(res) {
    this.code = CODE_ERROR;
    this.json(res);
  }

  jwtError(res) {
    this.code = CODE_TOKEN_EXPIRED;
    this.json(res);
  }
}

module.exports = Result;
