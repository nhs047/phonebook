const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const phoneBookSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true
  },
  phoneNo: {
    type: String,
    unique: true
  }
}, {
  versionKey: false // You should be aware of the outcome after set to false
});
phoneBookSchema.plugin(uniqueValidator);
const phonebookdata = mongoose.model('phonebook', phoneBookSchema);
module.exports.phonebookdata = phonebookdata;
