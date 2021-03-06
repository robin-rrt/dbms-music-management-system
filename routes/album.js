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

    var albumName = req.query.albumName;
    console.log(albumName);


    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query("SELECT * FROM album INNER JOIN artist ON artist.artist_id=album.artist_id INNER JOIN music ON music.album_id=album.album_id AND album.album_name = ? ", albumName,  (err, rows) => {
            connection.query(`UPDATE artist SET top_searched_artist = top_searched_artist + 1 
                                WHERE artist_id = (SELECT artist.artist_id FROM artist INNER JOIN album ON artist.artist_id=album.artist_id AND album.album_name = ?);`, albumName, (error,updated) => {
                                    if (!err) {
                                        // res.send(rows);
                                        console.log(updated);
                                    } else {
                                        console.log(err);
                                    }
                                })
            connection.release() // return the connection to pool
            
            if (!err) {
                // res.send(rows);
                res.render('albumView', {title: 'ALBUM NAME', rows:rows})
            } else {
                console.log(err)
            }
  
            // if(err) throw err
            console.log('Album information', rows)
        })
    })
});

module.exports = router;
