const { get } = require('axios')

const URL = `https://swapi.dev/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/${nome}/`
    const result = await get(url)
    return mapearPessoas(result.data)
}

function mapearPessoas (item) {
    return {
        nome: item.name,
        peso: item.height
    }
}

module.exports = {
    obterPessoas
}