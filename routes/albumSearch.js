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
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log('connected as id ' + connection.threadId)
    connection.query(`SELECT * FROM album JOIN artist ON album.artist_id=artist.artist_id AND album.album_name LIKE '${searchItem}%';`, (err, rows) => {
        connection.release() // return the connection to pool

        if (!err) {
            // res.send(rows);
            res.render('albumSearch', {title: 'Album Search', rows: rows, searchItem:searchItem})
        } else {
            console.log(err)
        }

        // if(err) throw err
        console.log('Album Search', rows)
    })

})

});

module.exports = router;
