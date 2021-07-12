const express = require("express");

const mongoose = require("mongoose");

const expresslayouts = require("express-ejs-layouts");

// Initialize express
const app = express();

// Look into the views folder for layout.ejs file
app.use(expresslayouts);
// Look for static files here in this folder
app.use(express.static("public"));


// Import Routes
const indexRoute = require('./routes/index');
const logRoute = require('./routes/log');

// Mount Routes
app.use('/', indexRoute);
app.use('/', logRoute);

// Setting view engine to ejs.
// Node.js to look into the folder views for all ejs files
app.set("view engine", "ejs");


mongoose.connect("mongodb://localhost:27017/captainLog" , {
    useNewUrlParser :true,
    useUnifiedTopology : true
},() => {
    console.log("MongoDB connected seccessfully")
});

// Listen for HTTP request on PORT 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Running on PORT  ${PORT}`);
  });