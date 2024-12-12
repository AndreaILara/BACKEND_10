
const cloudinary = require('../config/cloudinary');

const deleteImage = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log('Image deleted successfully from Cloudinary');
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};

module.exports = deleteImage;
