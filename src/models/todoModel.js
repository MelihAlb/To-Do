const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim:true
    },
    desc:{
        type : String,
        required : true,
        trim:true
    },
    completed:{
        type :Boolean,
        default : false,
    }
},{
    collection: "To-Do",timestamps:true
})
const todo= mongoose.model("To-Do",todoSchema)
module.exports = todo