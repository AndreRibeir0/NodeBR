const assert = require('assert')
const api = require('./../api')
let app = {}
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTYxMzMxODA5NH0.6LKCS89VLARfHrSa5DoQn8c_RPXYIL10789MzFAo3bw'

const headers = {
    Authorization: TOKEN
}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Negro',
    poder: 'A mira'
}

let MOCK_ID = ''

describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = JSON.stringify(MOCK_HEROI_INICIAL)
        MOCK_ID = dados._id
    })

    it('listar/herois', async () => {
        const result = await app.inject({
            method: 'GET',
            headers,
            url: '/herois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('listar/herois - deve retornar somente 10 registros', async () => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })
    it('listar/herois - deve retornar um erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AEEE'
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = {
            "statusCode":400,
            "error":"Bad Request",
            "message":"child \"limit\" fails because [\"limit\" must be a number]",
                "validation":{"source":"query",
                "keys":["limit"]
            }
        }

        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))
    })
    it('listar GET - /herois - deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 10
        const NAME = MOCK_HEROI_INICIAL.nome
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, NAME)
    })

    it('listar POST - /herois - deve filtrar um item', async () => {

        const result = await app.inject({
            method: 'POST',
            headers,
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR) 
        })

        const statusCode = result.statusCode
        const { message, _id } = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })

    it('atualizar PATH - /herois/:id', async () => {
        const _id = MOCK_ID
        const expected = {
            poder: 'Super Mira'
        }
        
        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected) 
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!')
    })

    it('atualizar PATH - /herois/:id - não deve atualizar com ID incorreto!', async () => {
        const _id = `6025af78c17a647c44cb4d84`
        
        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/herois/${_id}`,
            payload: JSON.stringify({
                poder: 'Super Mira'
            }) 
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        }        
        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('remover DELETE - /herois/:id', async () => {
        const _id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi removido com sucesso!')
    })

    it('remover DELETE - /herois/:id não deve remover', async () => {
        const _id = '6026ff1fcbaf6b07740d4d1e'
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco!'
        }
        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('remover DELETE - /herois/:id não deve remover com id invalido', async () => {
        const _id = 'ID_INVALIDO'
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            error: 'Internal Server Error',
            message: 'An internal server error occurred',
            statusCode: 500
          }
        assert.ok(statusCode === 500)
        assert.deepEqual(dados, expected)
    })
})