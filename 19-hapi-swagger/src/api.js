//npm install hapi
// npm i vision inert hapi-swagger


const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoutes = require('./routes/heroRoutes')
const HeroRoute = require('./routes/heroRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const swaggerConfig = {
    info: {
        title: '#CursoNodeBR - API Herois',
        version: 'v1.0'
    },
    lang: 'pt'

}

const app = Hapi.Server({
    port:5000
})

function mapRoutes(instance, methods) {
    return methods.map( method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    
    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerConfig
        }
    ]) 

    app.route(mapRoutes(new HeroRoute(context), HeroRoute.methods()))

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}
module.exports = main()
