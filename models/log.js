const  mongoose = require("mongoose");

const logSchema = mongoose.Schema({

    title: String,
    entry: String,
    shipIsBroken: Boolean
},
{
    timestamps: true 
});

const Log = mongoose.model("Log" , logSchema);
module.exports = Log;