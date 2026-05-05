var mongoose = require("mongoose");
//data authenticate hokr mongo db mein chala gya 
var plm = require("passport-local-mongoose").default;

mongoose.connect("mongodb://127.0.0.1:27017/Looksmaxxdb");

//my main data of email mongo side ka mtlb schema , collection and database hai->
function createUserSchema() {
  return mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String
    }
  });
}

const userSchema = createUserSchema();

//mongo db ka data and authentication link hogya ->
userSchema.plugin(plm);

module.exports = mongoose.model("userModel", userSchema);