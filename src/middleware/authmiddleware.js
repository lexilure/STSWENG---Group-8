// authMiddleware.js

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next(); // Proceed to the next middleware or route handler
    } else {
        res.redirect('/admin/login'); // Redirect to the login page if not authenticated
    }    
};

module.exports = sessionChecker;
