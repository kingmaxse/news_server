// 导入mysql模块
const mysql = require('mysql2')
// 数据库配置
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Hevennextstop',
  database: 'dailynews_db'
})

module.exports = db
