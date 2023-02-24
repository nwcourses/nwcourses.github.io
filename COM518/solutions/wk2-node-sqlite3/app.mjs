// Solution to the standard exercises for week 2 using the node-sqlite3
// library. You might want to try this if you have problems with better-sqlite3.

// Import dependencies
import express from 'express';
import sqlite3 from 'sqlite3';

// Create our Express server.
const app = express();

// Enable reading JSON from the request body of POST requests
app.use(express.json());

// Load the database. You may need to change the path.
const db = new sqlite3.Database("wadsongs.db", sqlite3.OPEN_READWRITE, (err)=>{
    if(err) {
        console.log(`Could not open database: ${err}`);
    } else {
        // Search by artist
        app.get('/artist/:artist', (req, res) => {
            const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist=?');
            stmt.all(req.params.artist, (err,results) => {
                if(err) {
                    res.status(500).json({error: err});
                } else {
                    res.json(results);
                }
            });
        });

        // Search by title 
        app.get('/title/:title', (req, res) => {
            const stmt = db.prepare('SELECT * FROM wadsongs WHERE title=?');
            stmt.all(req.params.title, (err,results) => {
                if(err) {
                    res.status(500).json({error: err});
                } else {
                    res.json(results);
                }
            });
        });
        // Search by artist and title
        app.get('/artist/:artist/title/:title', (req, res) => {
            const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist=? AND title=?');
            stmt.all(req.params.artist, req.params.title, (err,results) => {
                if(err) {
                    res.status(500).json({error: err});
                } else {
                    res.json(results);
                }
            });
        });

        // Buy a song
        app.post('/song/:id/buy', (req, res) => {
            const stmt = db.prepare('UPDATE wadsongs SET quantity=quantity-1 WHERE id=?');
            // The function supplied as the second parameter must be a classic
            // function, not an arrow function
            stmt.run(req.params.id, function(err) {
                if(err) {
                    res.status(500).json({error: err});
                } else {
                    // Ternary operator: a concise way of saying "if 
                    // this.changes equals 0, set the status to 400, otherwise
                    // set it to 200"
                    const status = this.changes == 0 ? 404: 200;
                    res.status(status).json({rowsUpdated: this.changes});
                }
            });
        });

        // Delete a song
        app.delete('/song/:id', (req, res) => {
            const stmt = db.prepare('DELETE FROM wadsongs WHERE id=?');
            stmt.run(req.params.id, function(err) {
                if(err) {
                    res.status(500).json({error: err});
                } else {
                    const status = this.changes == 0 ? 404: 200;
                    res.status(status).json({rowsUpdated: this.changes});
                }
            });
        });

        // Add a song
        app.post('/song/create', (req, res) => {
            const stmt = db.prepare('INSERT INTO wadsongs(title,artist,year,downloads,price,quantity) VALUES(?,?,?,0,?,?)');
            stmt.run(req.body.title, req.body.artist, req.body.year, req.body.price, req.body.quantity, function(err) {
                if(err) {
                    res.status(500).json({error: err});
                } else {
                    res.json({id: this.lastID});
                }
            });
        });

        app.listen(3000);
    }
});
