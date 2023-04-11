var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var db = mysql.createConnection({
        host:'34.173.6.203',
        user: 'root',
        password:'team064pass',
        database:'flights'
});
db.connect;

var app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

// test query 
app.get('/', function(req, res) {
        var queryTest = db.query('SELECT COUNT(FlightID) AS cCount FROM Flights', function(err, rows, fields) {
                res.send(rows);
                console.log(rows);
        })
});

// advanced query 1
app.get('/api/delay-10', function(req, res) {
        const sqlDelay10 = "SELECT Month, COUNT(*) AS cCount FROM Flights NATURAL JOIN Delays WHERE Airline = 'AA' AND DepartureDelay > 10 GROUP BY Month LIMIT 15";
        db.query(sqlDelay10, (err, result) => {
                res.send(result);
                console.log(err);
        })
});

// advanced query 2
app.get('/api/cancelledDFW-SFO', function(req, res) {
        const sqlDelay10 = "SELECT Airline, COUNT(*) AS cCount FROM Flights NATURAL JOIN Cancellations WHERE Destination = 'DFW' AND Origin = 'SFO' AND Cancelled = 1 GROUP BY Airline LIMIT 15";
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
        db.query(sqlInsert, [FirstName, LastName], (err, result) => {
                console.log(err);
        })
});

// Search for avg airline delay filtered by origin, destination, Month
// NOTE: TEST THIS QUERY ON WORKBENCH
app.get('/api/airlines-most-delayed', function(req, res) {
        let Origin_ = req.query.Origin;
        let Destination_ = req.query.Destination;
        let Month_ = req.query.Month;

        // if (Month == 10) {
        //     Month = 9;
        // }
    
        const sqlMostDelay = "SELECT Airline, AVG(ArrivalDelay) as avgDelay FROM Flights NATURAL JOIN Delays WHERE Origin = ? AND Destination = ? AND Month = ? GROUP BY Airline ORDER BY avgDelay DESC LIMIT 5";
        db.query(sqlMostDelay, [Origin_, Destination_, Month_], (err, result) => {
            res.send(result);
            console.log(err);
        });
    });



app.listen(3002, function () {
        console.log('Node app is running on port 3002');
});
