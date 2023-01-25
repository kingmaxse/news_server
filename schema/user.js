// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的规则
const username = joi.string().alphanum().min(1).max(10).required()

const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password
  }
}
