const commander = require('commander')
const database = require('./database')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")
        
        //CRUD
        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar um heroi")
        .option('-r, --remover', "Remove um heroi")
        .option('-a, --atualizar [value]', "Atualizar um heroi pelo id")
        .parse(process.argv)

        const heroi = new Heroi(commander)
        try {
            if (commander.cadastrar) {
                delete heroi.id

                const resultado = await Database.cadastrar(heroi)
                if (!resultado) {
                    console.error('Heroi não foi cadastrado!')
                    return;
                }
                console.error('Heroi cadastrado com sucesso!')
            }

            if (commander.listar)  {
                const resultado = await Database.listar()
                console.table(resultado)
                return;
            }

            if (commander.remover) {
                const resultado = await database.remover(heroi.id)
                if (!resultado) {
                    console.error('Não foi possivel remover o heroi')
                }
                console.error('Heroi removido com sucesso!')
            }

            if(commander.atualizar) {
                const idParaAtualizar = parseInt(commander.atualizar);
                // remover todas as chaves que estiverem com undefined | null
                const dado = JSON.stringify(heroi)
                const heroiAtualizar = JSON.parse(dado)
                const resultado = await database.atualizar(idParaAtualizar, heroiAtualizar)
                if(!resultado) {
                    console.error('Não foi possivel atualizar o heroi')
                }
                console.error('Heroi atualizado com sucesso!')
            }

            return
        } catch (error) {
            console.log('Deu ruim', error)
            return
        } 
};

main()