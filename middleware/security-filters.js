const jwt = require("jsonwebtoken");
const express = require('express')
const securityFilters = express.Router()

securityFilters.checkAuth = (roles) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null)
            return res.status(401).json({mensagem: "Token Inválido"})

        jwt.verify(token , process.env.JWT_SECRET, (err, payload) => {
            if (err)
                return res.status(401).json({mensagem: "Token Inválido"})

            if(roles == undefined) {
                next();
            }else{
                let requiredRoles = roles.split(';');
                let userRoles = payload.roles.split(';');

                if(requiredRoles.length == 0 || userRoles.some(r => requiredRoles.indexOf(r) >= 0)) {
                    next();
                } else {
                    res.sendStatus(403).json({mensagem: "Usuário não autorizado"});
                }
            }


        })
    }
}

module.exports = securityFilters