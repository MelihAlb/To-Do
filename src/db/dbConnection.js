const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

    .then(()=>{
        console.log("Connected to db");
    })
    .catch((err)=>{
        console.log("Can not connected to db"+ err );
    })