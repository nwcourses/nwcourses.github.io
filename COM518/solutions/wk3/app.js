/*
 * PLEASE NOTE:
 *
 * You can use this to compare with your lab exercise answer.
 *
 * However this code, or code derived from it, MUST NOT be used in the assignment.
 */

// Require dependencies
const express = require('express');
const mysql = require('mysql2');

// Create our Express server.
const app = express();

// Enable reading JSON from the request body of POST requests
app.use(express.json());

// Allow access to static content in the 'public' folder
app.use(express.static('public'));

// Create a database connection to the server - please edit to use your details
const con = mysql.createConnection({
    host: 'localhost',
    user: 'ephp001',
    password: 'huneecoh',
    database: 'ephp001'}
);

// Try to connect to the MySQL server
con.connect(err => {
    // If it fails, display an error
    if(err) {
        console.log(`Cannot connect to database: ${err}`);
        process.exit(1);
    } else {
        // If successful, set up the routes

        // Search by artist
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

        // Search by title
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

        // Search by title and artist
        app.get('/artist/:artist/title/:title', (req, res) => {
            con.query('SELECT * FROM wadsongs WHERE title=? AND artist=?',
                [req.params.title, req.params.artist], // note two bound parameters, so we create an array with two members
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else {
                        res.json(results);
                    }
                });
        });

        // Buy a song with a given ID
        app.post('/song/:id/buy', (req, res) => {
            con.query('UPDATE wadsongs SET quantity=quantity-1 WHERE ID=?',
                [req.params.id],
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else if (results.affectedRows == 0) {
                        res.status(404).json({error: 'No song with that ID!'});
                    } else {
                        res.json({updatedRows: results.affectedRows});
                    }
                });
        });

        // Create a new song, using a JSON object passed in the request body
        app.post('/newsong', (req, res) => {
            con.query('INSERT INTO wadsongs(title,artist,day,month,year,chart,review) VALUES(?,?,?,?,?,?,?)',
                [req.body.title, req.body.artist, req.body.day, req.body.month, req.body.year, req.body.chart, req.body.review],
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else {
                        res.json(results);
                    }
                });
        }); 

        // Delete a song
        app.delete('/song/:id', (req, res) => {
            con.query('DELETE FROM wadsongs WHERE ID=?',
                [req.params.id],
                (err, results, fields) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else if (results.affectedRows == 0) {
                        res.status(404).json({error: 'No song with that ID!'});
                    } else {
                        res.json({deletedRows: results.affectedRows});
                    }
                });
        });

        // Run the server on port 3000
        app.listen(3000);
    }
});
