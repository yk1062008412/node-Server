/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 22:05:17
 * @LastEditors: yk1062008412
 * @LastEditTime: 2020-01-05 12:37:55
 * @Description: file content
 */
const mysql = require('mysql2');

/**
 * Create mysql database pool on localhost
 */
module.exports = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "my_store",
    port: "3306",
    charset: "utf8", // Default database encode
    // acquireTimeout: 10000, // get connection Millisecond
    waitForConnections: true, // if true, connection queue will waiting can be used connect; if false immediately throw Error.
    connectionLimit: 10, // Maximum number of connections that can be created at a time
    queueLimit: 0 // The max request quantity. line up at the head of getConnection function. 0: unlimited
});