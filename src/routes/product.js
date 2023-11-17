const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const uploadCloud = require('../middleware/upload');
const {authorizationAdmin} = require("../middleware/cookieJwtAuth");

router.get('/create',authorizationAdmin, productController.showPageCreateProduct);
router.get('/trash', productController.trashProduct);
router.get('/:id/edit', productController.showPageUpdateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/update/:id',uploadCloud.single('image'), productController.updateProduct);
router.post('/save', uploadCloud.single('image'), productController.createProduct);
router.get('/list', productController.showList);
module.exports = router;