const express = require("express");
const router = require("./router");
const bodyParser = require("body-parser");
const cors = require("cors");
const history = require('connect-history-api-fallback');

const app = express();

app.use(history());

// cors跨域
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(5000, () => {
  console.log("http server is running on port 5000");
});
