const jwt = require('jsonwebtoken');
let accessTokenSecret = 'youraccesstokensecret';
exports.accessTokenSecret = 'youraccesstokensecret'


exports.authenticateJWT = (req, res, next) => {
    try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token= authHeader;
        
        
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;

            next();
        });
    } else {
        res.sendStatus(401);
    }
    } catch (error) {
        console.log('error auth')
        console.log(error)   
    }
};


