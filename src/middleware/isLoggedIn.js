
module.exports = (req, res, next) => {
    if (req.cookies && req.cookies.username) {
        next();
    }else{
        res.redirect('/register');
    }
}