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
    connection.query(`SELECT * FROM music INNER JOIN album ON music.album_id=album.album_id INNER JOIN genre ON  music.genre_id=genre.genre_id INNER JOIN artist ON music.artist_id=artist.artist_id AND genre.genre_name LIKE '${searchItem}%';`, (err, rows) => {
        connection.release() // return the connection to pool

        if (!err) {
            // res.send(rows);
            res.render('genreSearch', {title: 'Genre Search', rows: rows, searchItem:searchItem})
        } else {
            console.log(err)
        }

        // if(err) throw err
        console.log('Genre Search', rows)
    })

})

});

module.exports = router;

