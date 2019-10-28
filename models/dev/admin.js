const my_connection = require('../../config/dbmysql2');

const getAdmInfo = (req, res) => {
    // my_connection.getConnection((err, connection) => {
    //     connection.query('select * from admin_account', (error, result) => {
    //         if(error) throw error;
    //         res.status(200).send(result);
    //     });
    //     connection.release();
    // })
    // promist function 
    my_connection
        .query('select * from admin_account')
        .then(([rows, fields]) => {
            console.log(rows);
            res.status(200).send(rows)
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(() => my_connection.end())
}

module.exports = {
    getAdmInfo
}