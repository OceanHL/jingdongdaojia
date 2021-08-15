module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    semi: "off", // 关闭提示多余的分号
    quotes: ["error", "double"], // 关闭提示必须使用单引号
    "space-before-function-paren": [
      // 函数()前面是否有空格
      "error",
      {
        asyncArrow: "always",
        named: "never",
        anonymous: "always"
      }
    ]
  }
};
