const logger = require("../utils/logger");

function logar(req, res, next){
    logger.debug('Requisição %s na rota %s', req.method, req.path)
    next()
}

module.exports = logar