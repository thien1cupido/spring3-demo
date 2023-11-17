const jwt = require("jsonwebtoken");
const Account = require('../app/models/Account');

const authentication = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.clearCookie("token");
        return res.redirect("/login/showPageLogin");
    } else {
        next();
    }
};

const authorizationAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const user = jwt.verify(token, process.env.SERCRET_KEY);
        const foundUser = await Account.findOne({_id: user._id}).populate('roles').exec();
        if (foundUser.roles.name === 'ROLE_ADMIN') {
            next();
        } else {
            return res.redirect("/");
        }
    } catch (err) {
        return res.redirect("/");
    }
}
module.exports = {
    authentication,
    authorizationAdmin
};
