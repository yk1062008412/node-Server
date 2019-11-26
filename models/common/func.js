/*
 * @Author: yk1062008412
 * @Date: 2019-11-24 00:47:14
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-26 22:45:50
 * @Description: 公共方法
 */

const connection = require('../../config/dbmysql2');

/**
 * 返回limit的数字
 * @return [0] 从第 [0] 条数据开始
 * @return [1] 查 [1] 条数据
 **/
const getLimitData = (currentPage = 1, pageSize = 20) => {
    return [(currentPage - 1) * pageSize, currentPage * pageSize]
}

/**
 * 生成语句
 * @param {*数据库字段} key 
 * @param {*值} val 
 * @param {*类型: 1.and语句，2.like语句 (默认1)} type 
 */
const geneSqlText = (key, val, type=1) => {
    if (key && val) {
      if (type === 1) { // and语句
        return ` AND ${key}=${connection.escape(val)}`
      }
      if (type === 2) { // like语句
        return ` AND ${key} LIKE '%${connection.escape(val)}%'`
      }
      if (type === 3) { // >=语句
        return ` AND ${key} >= ${connection.escape(val)}`
      }
      if (type === 4) { // <=语句
        return ` AND ${key} <= ${connection.escape(val)}`
      }
    } else {
        return ''
    }
  }

module.exports = {
    getLimitData,
    geneSqlText
}