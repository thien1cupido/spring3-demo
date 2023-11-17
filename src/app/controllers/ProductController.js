const Product = require('../models/Products');
const Brand = require('../models/Brand');

const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose');

class ProductController {
    showList(req, res, next) {
        const loginMessage = req.flash('success');
        if (loginMessage.length > 0) {
            Product.find().populate('brands').exec().then((product) => {
                res.render('product/list', {
                    product: multipleMongooseToObject(product),
                    login: {
                        status: 'success',
                        message: loginMessage
                    }
                });
            }).catch(next);
        } else {
            Product.find().populate('brands').exec().then((product) => {
                res.render('product/list', {
                    product: multipleMongooseToObject(product)

                });
            }).catch(next);
        }
    }

    showPageCreateProduct(req, res, next) {
        Brand.find().then(brand => {
            res.status(200).render('product/create', {brand: multipleMongooseToObject(brand)})
        }).catch(next);
    }

    createProduct(req, res, next) {
        req.body.image = req.file ? req.file.filename : '';
        const formData = {...req.body};
        const product = new Product(formData);
        product.save().then(() =>
            res.status(201).redirect('/product/list')).catch(err => {
            if (err) {
                const validationErrors = [];
                for (const field in err.errors) {
                    validationErrors[field] = err.errors[field].message
                }
                Brand.find().then(brand => {
                        res.render('product/create', {
                            error: validationErrors,
                            product: {...req.body, image: req.file ? req.file.originalname : ''},
                            brand: multipleMongooseToObject(brand)
                        });
                    }
                ).catch(next);
            }
        })
    }

    deleteProduct(req, res, next) {
        Product.delete({_id: req.params.id}).then(() => {
            res.redirect('/product/list')
        }).catch(next);

    }

    showPageUpdateProduct(req, res, next) {
        Product.findById({_id: req.params.id}).then(product => {
            Brand.find().then(brand => {
                res.render('product/update', {
                    product: mongooseToObject(product),
                    brand: multipleMongooseToObject(brand)
                })
            }).catch(next);
        }).catch(next);
    }

    updateProduct(req, res, next) {
        req.body.image = req.file ? req.file.filename : '';
        const formData = {...req.body};
        Product.updateOne({_id: req.params.id}, formData)
            .then(() =>
                res.status(201).redirect('/product/list')).catch(err => {
            if (err) {
                const validationErrors = [];
                for (const field in err.errors) {
                    validationErrors[field] = err.errors[field].message
                }
                Brand.find().then(brand => {
                        res.render('product/update', {
                            error: validationErrors,
                            product: {...req.body, image: req.file ? req.file.originalname : ''},
                            brand: multipleMongooseToObject(brand)
                        });
                    }
                ).catch(next);
            }
        })
    }

    trashProduct(req, res, next) {
        Product.findDeleted().populate('brands').exec().then((product) => {
            res.render('/product/list', {product: multipleMongooseToObject(product)})
        })
            .catch(next);
    }
}

module.exports = new ProductController();