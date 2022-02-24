// Solution to the standard exercises for week 2

const express = require('express');
const app = express();
app.use(express.json());
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'ephp001',
    password: 'huneecoh',
    database: 'ephp001'}
);

con.connect(err => {
    if(err) {
        console.log(`Cannot connect to database: ${err}`);
    } else {
        app.get('/artist/:artist', (req, res) => {
            con.query('SELECT * FROM wadsongs WHERE artist=?',
                [req.params.artist],
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else {
                        res.json(results);
                    }
                });
        });

        app.get('/title/:title', (req, res) => {
            con.query('SELECT * FROM wadsongs WHERE title=?',
                [req.params.title],
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else {
                        res.json(results);
                    }
                });
        });

        app.get('/artist/:artist/title/:title', (req, res) => {
            con.query('SELECT * FROM wadsongs WHERE title=? AND artist=?',
                [req.params.title, req.params.artist],
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else {
                        res.json(results);
                    }
                });
        });

        app.post('/song/:id/buy', (req, res) => {
            con.query('UPDATE wadsongs SET quantity=quantity-1 WHERE ID=?',
                [req.params.id],
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({errror: err});
                    } else if (results.affectedRows == 0) {
                        res.status(404).json({error: 'No song with that ID!'});
                    } else {
                        res.json({updatedRows: results.affectedRows});
                    }
                });
        });

        app.post('/newsong', (req, res) => {
            con.query('INSERT INTO wadsongs(title,artist,day,month,year,chart,review) VALUES(?,?,?,?,?,?,?)',
                [req.body.title, req.body.artist, req.body.day, req.body.month, req.body.year, req.body.chart, req.body.review],
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({errror: err});
                    } else {
                        res.json(results);
                    }
                });
        }); 
        app.delete('/song/:id', (req, res) => {
            con.query('DELETE FROM wadsongs WHERE ID=?',
                [req.params.id],
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({errror: err});
                    } else if (results.affectedRows == 0) {
                        res.status(404).json({error: 'No song with that ID!'});
                    } else {
                        res.json({deletedRows: results.affectedRows});
                    }
                });
        });

        app.listen(3000);
    }
});
