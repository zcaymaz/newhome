const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary yapılandırması
cloudinary.config({
    cloud_name: "beyazteknik",
    api_key: "243881761393576",
    api_secret: "Jm1hIuwvybmKBcMHx7cnVoGFXzo"
  });

// Multer ile CloudinaryStorage kullanarak yükleme işlemi için yapılandırma
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => `${Date.now()}_${file.originalname}`
  }
});
const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;
