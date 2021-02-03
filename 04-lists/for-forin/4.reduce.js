const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let index = 0; index <= this.length -1; index ++) {
        valorFinal = callback(valorFinal, this[index], this)
    }

    return valorFinal
}

async function main(){
    try {
        const { results } = await obterPessoas(``)
        const pesos = results.map(item => parseInt(item.height))
        console.log('pesos', pesos)
        // [20.2, 30.6, 40.8] = 0
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // }, 0)

        const minhaLista = [
            ['Erick', 'Wendel'],
            ['NodeBR', 'Nerdzão']
        ]

        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
        .join(', ')

        console.log('total', total)

    } catch (error) {
        console.log('Deu ruim', error)
    }
}

main()