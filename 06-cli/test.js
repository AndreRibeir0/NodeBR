const {
    deepEqual,  
    deepStrictEqual,  
    ok
} = require('assert')

const DEFAULT_ITEM_CADASTRAR = { 
    nome: 'Flash', 
    poder: 'Speed', 
    id: 1
}

const database = require('./database')

describe('Suite de manipulação de Herois', () => {

    it('Deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        deepStrictEqual(resultado, expected)
    })
    
    // it('Deve cadastrar um heroi, usando arquivos', async () => {
    //     const expected = DEFAULT_ITEM_CADASTRAR

    //     ok(null, expected)
    // })
})