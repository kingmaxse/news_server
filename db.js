// 导入mysql模块
const mysql = require('mysql2')
// 数据库配置
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Hevennextstop',
  database: 'dailynews_db'
})
// 测试数据是否联通
db.query(
  'select * from dailynews_users where username=?',
  'sunwukong',
  (err, results) => {
    if (err) return console.log(err.message)
    console.log(results)
  }
)

// //插入到用户的信息 insert user info
// const user = { username: 'Batman', password: 'pcc321' }
// // const sqlStr = 'INSERT INTO users (username, password) values (?, ?)'
// const sqlStr = 'INSERT INTO users set ?'
// db.query(sqlStr, user, (err, results) => {
//   if (err) return console.log(err.message) // fail
//   if (results.affectedRows === 1) {
//     console.log('Success') //Susccessful
//   }
// })

//update userino
// const user2 = { id: 6, username: 'Windman', password: 'pcc3210' }
// const sqlStr2 = 'UPDATE users set username= ?, password=? where id= ?'
// db.query(
//   sqlStr2,
//   [user2.username, user2.password, user2.id],
//   (err, results) => {
//     if (err) return console.log(err.message) // fail
//     if (results.affectedRows === 1) {
//       console.log('Update Success') //Susccessful
//     }
//   }
// )

// const userinfo = { username: 'sunwukong', password: 7534678 }
// const sql = `select * from dailynews_users where username=?`
// db.query(sql, [userinfo.username], function (err, results) {
//   // 执行 SQL 语句失败
//   if (err) {
//     return console.log({ status: 1, message: err.message })
//   }
//   // 用户名被占用
//   if (results.affectedRows === 1) {
//     return console.log('用户名被占用，请更换其他用户名!')
//   }
// // TODO: 用户名可用，继续后续流程...
// userinfo.password = bcrypt.hashSync(userinfo.password, 10)
// // 定义插入新用户语句
// const sql = 'insert into dailynews_users set ?'
// db.query(
//   sql,
//   { username: userinfo.username, password: userinfo.password },
//   function (err, results) {
//     // 执行 SQL 语句失败
//     if (err) return res.send(err) // SQL 语句执行成功，但影响行数不为 1
//     if (results.affectedRows !== 1) {
//       return results.sebd('注册用户失败，请稍后再试!')
//     }
//     // 注册成功
//     results.send({ status: 0, message: '注册成功!' })
//   }
// )
// })
