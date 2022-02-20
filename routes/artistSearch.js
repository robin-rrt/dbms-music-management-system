var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'dbms'
  })


/* GET home page. */
// index page
router.get('/', function(req, res) {
  var searchItem = req.query.search;
  console.log(searchItem);

  
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log('connected as id ' + connection.threadId)
    connection.query(`SELECT * FROM artist WHERE artist_name LIKE '${searchItem}%';`, (err, rows) => {
        connection.release() // return the connection to pool

        if (!err) {
            // res.send(rows);
            res.render('artistSearch', {title: 'Artist Search', rows: rows, searchItem:searchItem})
        } else {
            console.log(err)
        }

        // if(err) throw err
        console.log('Artist Search', rows)
    })

})

});

module.exports = router;

//SELECT * FROM artist WHERE artist_name LIKE ? + '%';