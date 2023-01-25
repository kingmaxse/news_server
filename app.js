// 1. 导入 express
const express = require('express')
const joi = require('joi')

// 2. 创建 web 服务器
const app = express()

// 倒入并配置跨域中间件
const cors = require('cors')
app.use(cors())

// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间 件:
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功; status = 1 为失败; 默认将 status 的值设置为 1，方便处理失败的情 况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})

// // 用这个包来生成 Token 字符串
// const jwt = require('jsonwebtoken')
// const expressJWT = require('express-jwt')
// // 定义密钥
// const secretKey = 'dailynews No1. ^_^'

// // 注册将JWT解析为json的中间件
// app.use(expressJWT({ secret: secretKey }))
// // 生成 Token 字符串
// const tokenStr = jwt.sign(user, secretKey, {
//   expiresIn: '0.5h' // token 有效期为 10 个小时
// })

// // 4. 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
// app.get('/user', (req, res) => {
//   // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
//   res.send({ name: 'zs', age: 20, gender: '男' })
// })
// app.post('/user', (req, res) => {
//   // 调用 express 提供的 res.send() 方法，向客户端响应一个 文本字符串
//   res.send('请求成功')
// })
// app.get('/', (req, res) => {
//   // 通过 req.query 可以获取到客户端发送过来的 查询参数
//   // 注意：默认情况下，req.query 是一个空对象
//   console.log(req.query)
//   res.send(req.query)
// })
// // 注意：这里的 :id 是一个动态的参数
// app.get('/user/:ids/:username', (req, res) => {
//   // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
//   console.log(req.params)
//   res.send(req.params)
// })

// 3. 启动 web 服务器
app.listen(3007, () => {
  console.log('express server running at http://127.0.0.1:3007')
})
