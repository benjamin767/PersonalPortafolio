function isAuthenticated (req, res, next) {
    if (req.session.id) next()
    else next('route')
}

const tokenMiddleware = (req, res, next) => {
    if (req.session && req.session.token) { // Verifica si existe una sesión y un token
        req.headers.authorization = `Bearer ${req.session.token}`;
    }
    next();
};

module.exports = {
    tokenMiddleware,
    isAuthenticated
}