const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute{
    constructor(db) {
        super()
        this._db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    // payload -> body
                    //headers -> header
                    //params -> na URL :id
                    // query -> ?skip=10&limit=100
                    // failAction: (request, headers, error) => {
                    //     throw error;
                    // },
                    failAction: (request, headers, error) => {
                        throw error
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().min(1).max(100).default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { 
                        skip,
                        limit,
                        nome 
                    } = request.query

                    const query = nome ? { nome: {$regex: `.*${nome}*.`} } : {}

                    return this._db.read(query, skip, limit)

                } catch(error) {
                    console.log('Deu ruim', error)
                    return "Erro interno no servidor"
                }
            },
        }
    }
}

module.exports = HeroRoutes