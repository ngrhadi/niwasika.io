const mongoose = require("mongoose")

const EmotSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
    },
    emoji : {
        type : String,
        require : true,
        max : 1,
        min : 1,
        emots : ["😊","🥰","😍","🤢","💔","💩","💞",],
    },
    comment : {
        type : String,
        rrequire : true,
        min : 10,
        max : 250,
    },
    lat : {
        type : Number,
        require : true,
    },
    lng : {
        type : Number,
        require : true,
    }
}, {timestamps : true, Geolocation : true});

module.exports = mongoose.model("Emot", EmotSchema);
