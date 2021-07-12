const express = require('express');

const router = express.Router();

// HTTP GET - ROOT ROUTE OF OUR APPLICATION
router.get('/', (req, res) => {
    // res.send("Welcome to Blog App");
    res.render("views/index", {welcoemMessage: "Welcome to Captains Log"});
});
module.exports = router;