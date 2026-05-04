var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/27017/Looksmaxxdb");

var userSchema = mongoose.Schema({
  
  
});

module.exports = mongoose.model("userModel",userSchema)

