const db = require('../db/index')

const bcrypt = require('bcryptjs')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')

exports.register = (req, res) => {
  const userinfo = req.body
  // 判断是否为空  简易的方法，复杂的验证需第三方包
  // if (!userinfo.username || !userinfo.password) {
  //   return res.cc('用户名或者密码不合法')
  // }

  // 判断是否被占用
  const sqlSelect = 'select * from dailynews_users where username=?'
  db.query(sqlSelect, userinfo.username, (err, results) => {
    // 执行 SQL 语句失败

    if (err) {
      return res.cc(err)
    }
    // 用户名被占用
    if (results.length > 0) {
      return res.cc('用户名被占用，请更换其他用户名!')
    }
    // TODO: 用户名可用，继续后续流程...
    userinfo.password = bcrypt.hashSync(userinfo.password, 5)
    // 定义插入新用户语句
    const sql = 'insert into dailynews_users set ?'
    db.query(
      sql,
      { username: userinfo.username, password: userinfo.password },
      function (err, results) {
        // 执行 SQL 语句失败
        console.log(err)
        if (err) return res.cc(err) // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          return res.cc('注册用户失败，请稍后再试!')
        }
        // 注册成功
        res.cc('注册成功!', 0)
      }
    )
  })
}

exports.login = (req, res) => {
  const userinfo = req.body
  const sql = `select * from dailynews_users where username=?`
  db.query(sql, userinfo.username, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (results.length !== 1) return res.cc('登录失败！')
    // TODO：判断用户输入的登录密码是否和数据库中的密码一致
    // 拿着用户输入的密码,和数据库中存储的密码进行对比
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    )

    // 如果对比的结果等于 false, 则证明用户输入的密码错误
    if (!compareResult) {
      return res.cc('登录失败！')
    }

    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    const user = { ...results[0], password: '', user_pic: '' }
    // 生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn
    })
    // success
    res.send({
      status: 0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr
    })
  })
}
