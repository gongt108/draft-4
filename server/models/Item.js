const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  color: {
    type: String
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);