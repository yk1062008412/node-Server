const my_connection = require('../config/dbmysql2');

/**
 * This is on a Demo function.
 * To show how to request data.
 */
const getMyTestChracter = (req, res, dic) => {
    // const { id } = req.params;
    // my_connection.getConnection((err, connection) => {
    //     connection.query('SELECT * from db.table where id = $1', [id] , (error, results) => {
    //         if (error) {
    //           throw error;
    //         }
    //         res.status(200).json(results.rows);
    //     });
    //     connection.release();
    // })
    // Use Promise way
    // const { name , age } = req.params;
    // my_connection
    //     .query('SELECT * from db.table where name = $1 and age = $2', [name , age])
    //     .then(([rows, fields]) => {
    //         res.status(200).json(rows);
    //     })
    //     .catch(err => {
    //         return err;
    //     })
    res.status(200).json({ user: 'testok' })
}


module.exports = {
    getMyTestChracter
}