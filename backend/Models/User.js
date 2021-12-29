const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
        min : 5,
        max : 10,
        unique : true,
    },
    email : {
        type : String,
        require : true,
        unique : true,
    },
    password : {
        type : String,
        require : true,
        min : 6,
    }
}, {timestamps : true}, {Geolocation : true});

module.exports = mongoose.model("User", UserSchema);
