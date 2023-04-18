const jwt = require('jsonwebtoken')

function autenticar(req, res, next){

    const auth = req.headers["authorization"]
    const token = auth && auth.split(' ')[1]
    if (!token){
        return res.sendStatus(401)
    }else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, paylod) => {
            if (err) return res.sendStatus(403)
            req.user = paylod
            next()
        })
    }
}

module.exports = autenticar