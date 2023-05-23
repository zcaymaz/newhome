const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: [String],
    required: true
  }
});

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = ImageModel;
