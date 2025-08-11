const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventory_db"
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ MySQL Connected");
});

// Add new product
app.post("/addProduct", (req, res) => {
    const { name, quantity, price } = req.body;
    const total = quantity * price;
    const sql = "INSERT INTO products (name, quantity, price, total) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, quantity, price, total], (err) => {
        if (err) throw err;
        res.send({ message: "Product Added Successfully" });
    });
});

// Get all products
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});