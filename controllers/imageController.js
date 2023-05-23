const ImageModel = require('../models/imageModel');

const uploadImage = async (req, res) => {
  const imageUrls = req.files.map((file) => file.path);
  const { name, description } = req.body;

  try {
    const newImage = new ImageModel({
      name,
      description,
      url: imageUrls
    });

    await newImage.save();

    res.status(200).json({ success: true, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await ImageModel.find({}, 'name description url');

    res.status(200).json({ success: true, images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  uploadImage,
  getImages
};
