var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
        host:'34.173.6.203',
        user: 'root',
        password:'team064pass',
        database:'flights'
});
connection.connect;

var app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

// test query 
app.get('/', function(req, res) {
        var queryTest = connection.query('SELECT COUNT(FlightID) AS cCount FROM Flights', function(err, rows, fields) {
                res.send(rows);
                console.log(rows);
        })
});

// advanced query 1
app.get('/api/delay-10', function(req, res) {
        const sqlDelay10 = "SELECT COUNT(*) AS cCount FROM Flights NATURAL JOIN Delays WHERE Airline = 'AA' AND DeparturDelay > 10 GROUP BY Month LIMIT 15";
        db.query(sqlDelay10, (err, result) => {
                res.send(result);
                console.log(err);
        })
});


// add new customer information
app.post('/api/customer-update', function(req, res) {
        const FirstName = req.body.FirstName;
        const LastName = req.body.LastName;

        const sqlInsert = "INSERT INTO Customers (FirstName, LastName) VALUES (?,?)";
        connection.query(sqlInsert, [FirstName, LastName], (err, result) => {
                console.log(err);
        })
});

app.listen(3002, function () {
        console.log('Node app is running on port 3002');
});
