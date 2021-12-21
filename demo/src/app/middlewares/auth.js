const jwt = require('jsonwebtoken');

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // Beaer [token]
    const token = authorizationHeader.split(' ')[1];
    if(!token) res.sendStatus(401);

    jwt.verify(token, 'next user secret', (err, data) => {
        console.log(err, data);
        if (err) res.sendStatus(403);
        next();
    })
}

module.exports = { authenToken }