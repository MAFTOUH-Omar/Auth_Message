const mongoose = require("mongoose");

var roleSchema = new mongoose.Schema({
  name: {
    type:String,
    enum:['admin','normal']
  }
});
module.exports = mongoose.model("role", roleSchema);