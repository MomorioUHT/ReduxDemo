const mysql = require('mysql2');
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cookieParser());
//========================================================
//SYSTEM ENVIRONMENT
require('dotenv').config();
const MySQL_HOST = process.env.BACKEND_HOST;
const MySQL_PORT = process.env.BACKEND_PORT;
const MySQL_PASSWORD = process.env.BACKEND_PASSWORD;
const OperatingSystem = process.env.OSTYPE;
//========================================================
//COMPILER CONFIG
var compiler = require('compilex');
var options = { stats: true }; //prints stats on console 
compiler.init(options);
//========================================================
//QUEUEING
let queue = 0;
//========================================================
//SERVER CONFIG
const testdb = mysql.createConnection({
    host: MySQL_HOST,
    user: "root",
    password: String(MySQL_PASSWORD),
    port: Number(MySQL_PORT),
    database: "testredux",
});
const PORT = 8000;
const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
testdb.connect(function (error) {
    if (error) {
        console.error(error);
    }
    else {
        console.log('Connection successful (testdb)');
    }
});
//========================================================
app.get('/products', function (req, res) {
    const command = "SELECT * FROM products";
    testdb.query(command, (err, data) => {
        if (err) {
            console.log(err);
            return res.send("GET_PRODUCTS_ERROR");
        }
        else {
            return res.send(data);
        }
    });
});
app.post('/addproduct', function (req, res) {
    const ProductName = req.body.ProductName;
    const ProductPrice = req.body.ProductPrice;
    const command = "INSERT INTO products (ProductName, ProductPrice) VALUES (?)";
    const valueToUpdate = [
        ProductName,
        ProductPrice
    ];
    testdb.query(command, [valueToUpdate], (err, data) => {
        if (err) {
            console.log(err);
            return res.send("ADD_PRODUCT_ERROR");
        }
        else {
            return res.send(data);
        }
    });
});
app.post('/deleteproduct', function (req, res) {
    const command = "DELETE FROM products WHERE ProductName = ?";
    const valueToUpdate = [
        req.body.ProductName
    ];
    testdb.query(command, [valueToUpdate], (err, data) => {
        if (err) {
            console.log(err);
            return res.send("DELETE_PRODUCT_ERROR");
        }
        else {
            return res.send(data);
        }
    });
});
//========================================================
app.listen(PORT);
console.log("Backend MySQL Host =", MySQL_HOST);
console.log("Backend MySQL Password =", MySQL_PASSWORD);
console.log("Backend MYSQL Port =", MySQL_PORT);
console.log("Backend is running on port =", PORT);
//# sourceMappingURL=index.js.map