const express = require('express');
const xss = require('xss');
const db = require('./my');

const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.set('view engine' , 'ejs');

const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);

const sessionStore = new MySQLStore({ } , db.promise());

app.use(expressSession({
    store: sessionStore, 
    secret: 'BinnieAndClyde', 
    resave: false, 
    saveUninitialized: false, 
    rolling: true, 
    unset: 'destroy', 
    cookie: { 
        maxAge: 600000,
        httpOnly: false
    }
}));

app.get('/', (req, res) => {
    const msg = req.session && req.session.username ? `Logged in as ${req.session.username}. <a href='logout'>Logout</a>` : "Not logged in. <a href='login.html'>Login</a>";
    res.render('main', { msg: msg } );
});

app.post('/buy', (req, res) => {
    res.render('main', { msg : xss(`You are buying the song with ID ${req.body.id}`)});
});

app.post('/login', (req, res) => {
    db.query(`SELECT * FROM ht_users WHERE password='${req.body.password}' AND username='${req.body.username}'`, (err, results, fields) => {

// password = 'password'
// username = Fred' OR '1=1

// SELECT * FROM ht_users WHERE password='password' AND username='Fred' OR '1=1'
/// SELECT * FROM ht_users WHERE 1=1 (because there is no user with Fred/password)
        let msg;
        if(err) {
            msg = "db connection error";
        } else if (results.length == 0) {
            msg = "Invalid login";
        } else {
            req.session.username = results[0].username;
            msg = `Logged in as ${results[0].username}. Your credit card is ${results[0].creditcard}, please spend away... <a href='logout'>Log out</a>`;
        }
        res.render('main', { msg: msg } );
    });
});

app.all('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

app.listen(3000);
