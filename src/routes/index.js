const siteRouter=require('./site');
const productRouter=require('./product');
const loginRouter=require('./login');
const {authentication} = require("../middleware/cookieJwtAuth");

function route(app) {
    app.use('/product',authentication, productRouter);
    app.use('/login', loginRouter);
    app.use('/', siteRouter);
}
module.exports = route;