const mysql = require('mysql2');

/**
 * Create mysql database pool on localhost
 */
module.exports = mysql.createPool({
    host: "192.168.1.1",
    user: "root",
    password: "123456",
    database: "mydba",
    charset: "utf8", // Default database encode
    acquireTimeout: 10000, // get connection Millisecond
    waitForConnections: true, // if true, connection queue will waiting can be used connect; if false immediately throw Error.
    connectionLimit: 10, // Maximum number of connections that can be created at a time
    queueLimit: 0 // The max request quantity. line up at the head of getConnection function. 0: unlimited
});