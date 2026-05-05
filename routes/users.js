var mongoose = require("mongoose");
var plm = require("passport-local-mongoose").default;

mongoose.connect("mongodb://127.0.0.1:27017/Looksmaxxdb");

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

userSchema.plugin(plm);

module.exports = mongoose.model("userModel", userSchema);