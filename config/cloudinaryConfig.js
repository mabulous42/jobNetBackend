const cloudinary = require ("cloudinary").v2

cloudinary.config({
    // cloud_name: process.env.CLOUD_NAME,
    // api_key: process.env.CLOUD_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET

    cloud_name: "mabulous42",
    api_key: "382933498849266",
    api_secret: "QmUUXWozpsqRHYB7TbEmmRhTrYo"
})

module.exports = {cloudinary}