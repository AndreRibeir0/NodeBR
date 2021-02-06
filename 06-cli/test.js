const {
    deepEqual,  
    deepStrictEqual,  
    ok
} = require('assert')
const { escreverArquivos } = require('./database')

const DEFAULT_ITEM_CADASTRAR = { 
    nome: 'Flash', 
    poder: 'Speed', 
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}

const database = require('./database')

describe('Suite de manipulação de Herois', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('Deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        deepStrictEqual(resultado, expected)
    })
    
    it('Deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [ actual ] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepStrictEqual(actual, expected)
    })

    it('deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepStrictEqual(resultado, expected)
    })

    it('Deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        console.log('Resultado', resultado)
        console.log('Expected', expected)
        deepStrictEqual(resultado, expected)
    })
})