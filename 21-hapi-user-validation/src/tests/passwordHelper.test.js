const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'Andre@123456'
const HASH = '$2a$04$WTOE.RFXPitLeEyb1OMUnOMpA59NIQlBK4ygBNceBmPqC73FXESqW'

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        //console.log('result', result)
        assert.ok(result.length > 10)
    })

    it('deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })
})