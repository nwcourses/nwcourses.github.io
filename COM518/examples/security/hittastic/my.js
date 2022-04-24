const mysql = require('mysql2');

const con = mysql.createConnection({
        host: 'localhost',
        user: 'ephp001',
        database: 'ephp001',
        password: 'password'});

        con.connect( err=> {
            if(err) {
                   console.log(err);
                process.exit(1);
            } else { 
                console.log('connected to mysql ok');
            }
        });
    
module.exports = con;


