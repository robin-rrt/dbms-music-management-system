var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'dbms',
    multipleStatements: true
  })

/* GET home page. */
// index page
router.get('/', function(req, res) {

    var artistName = req.query.artistName;
    console.log(artistName);


    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query(`SELECT * FROM artist 
                            INNER JOIN album 
                            ON artist.artist_id=album.artist_id AND artist.artist_name = ? ORDER BY top_searched_artist DESC;`, artistName,  (err, rows) => {
                                connection.query(`UPDATE artist SET top_searched_artist = top_searched_artist + 1 
                                WHERE artist.artist_id = (SELECT artist_id FROM artist WHERE artist_name = ?);`, artistName, (error,updated) => {
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
                res.render('artistView', {title: 'ARTIST NAME', rows:rows})
            } else {
                console.log(err)
            }
  
            // if(err) throw err
            console.log('Artist information', rows)
        })
    })
});

module.exports = router;
