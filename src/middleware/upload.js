// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');
//
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET
// });
//
// const storage = new CloudinaryStorage({
//     cloudinary,
//     allowedFormats: ['jpg', 'png'],
//     params:{
//         folder:'spring3_demo'
//     }
// });
//
// const uploadCloud = multer({ storage });
//
// module.exports = uploadCloud;
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Thư mục đích để lưu trữ tệp hình ảnh
        cb(null, '/demo/src/public/img/product');
    },
    filename: function (req, file,  cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
module.exports = upload