const express = require("express");
const app = express();

const errorMidllerware = require("./middleware/error")

app.use(express.json());

// Route Imports
const product = require("./routes/productRoute");

app.use("/api/v1", product);

// Middleware for Errors
app.use(errorMidllerware);

module.exports = app;