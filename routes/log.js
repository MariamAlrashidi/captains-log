const express = require("express");
const router = express.Router();

const moment = require("moment");

const methodOverride = require("method-override");

// Use Method Override
router.use(methodOverride('_method'));

// Import Model
const Log = require("../models/Log");

// Grab The Form Data
router.use(express.urlencoded({extended: true}));


// HTTP GET - Retrive data from the database - R 
// HTTP POST - To send the data into the database - C 
// HTTP PUT - TO update the data into the database - U
// HTTP DELETE - To delete the data from the database - D


// Create -- HTTP GET - Load The Form
router.get("/log/add", (reg,res)=>{
    res.render("log/add")
})

//Send -- HTTP POST - To post the log
router.post("/log/add" , (req,res)=>{

    let log = new Log(req.body);
 
    // Save the data in the database (mongoose function)
    log.save()
    .then(()=>{
        res.redirect("/log/index");
    })
    .catch((err)=>{
        console.log(err);
        res.send("Error");
    })
 })
 
 // Find all logging in get all the log from Database
 router.get("/log/index", (req,res)=>{
     // find all Daily log the data in the database (mongoose function)
     Log.find()
     .then(logs =>{
 res.render("log/index" , {logs, moment});
     })
     .catch((err)=>{
         console.log(err);
         res.send("Error");
     })      
 })
 
 //Show spicfic daily log by ID 
 router.get("/log/detail" , (req,res)=>{
     Log.findById(req.query.id)
     .then(log =>{
         res.render("log/detail" , {log , moment});
     })
     .catch((err)=>{
         console.log(err);
         res.send("Error");
     }) 
 })
 
 // Delete spicfic daily log by ID 
 router.get("/log/delete" ,(req,res)=>{
     Log.findByIdAndRemove(req.query.id)
     .then(()=>{
         res.redirect("/log/index")
     })
     .catch((err)=>{
         console.log(err);
         res.send("Error");
     }) 
 })
 
 // Edit spicfic daily log by ID --GET ALL LOG EDIT
 router.get("/log/edit" , (req,res)=>{

    console.log(req.query.id);
    console.log("edit log ID !!!!!");

    Log.findById(req.query.id)
    .then(log => {
        res.render("log/edit", {log});
    })
    .catch(err => {
        console.log(err);
    })

})
 // Edit spicfic daily log by ID -- CREATE LOG EDIT

router.post("/log/edit", (req, res) => {
        console.log(req.query.id );
    Log.findByIdAndUpdate(req.query.id , req.body )
    .then(() => {
        console.log("finsh for edit ID");
        res.redirect("/log/index")
    })
    .catch(err => {
        console.log(err);
    })
})


 
 module.exports = router