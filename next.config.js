const withCSS = require("@zeit/next-css");
require("dotenv").config();

module.exports = withCSS({
  env: {
    KAKAO_SECRET: process.env.KAKAO_SECRET,
    KAKAO_MAP_KEY: process.env.KAKAO_MAP_KEY
  }
});