const Account = require('../models/Account');
const jwt = require('jsonwebtoken');


class AuthenticateController {

    showPageLogin(req, res, next) {
        const loginMessage = req.flash('error');
        if (loginMessage.length > 0) {
            res.render('login', {layout:false,status: 'error', message: loginMessage})
        } else {
            res.render('login',{layout:false})
        }
    }

    login(req, res, next) {
        Account.findOne({
            username: req.body.username,
            password: req.body.password
        }).then(data => {
            if (data) {
                const token = jwt.sign({_id:data._id}, process.env.SERCRET_KEY);
                req.flash('success','Đăng nhập thành công!!!');
                return res.status(201)
                    .cookie('token',token, {
                        expires: new Date(Date.now() + 8 * 3600000), httpOnly: true
                    }).redirect('/product/list');
            }else {
                req.flash('error','Đăng nhập thất bại!!!');
                return res.redirect("/login/showPageLogin");
            }
        }).catch(err=>{
            req.flash('error','Đăng nhập thất bại!!!');
            return res.redirect("/login/showPageLogin");
        });
    }
}

module.exports = new AuthenticateController;