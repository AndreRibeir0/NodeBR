const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')
const SENHA = 'Andre@123456'
const HASH = '$2a$04$ddtwF0fQhPROFn5YYTJfmOp6XeqgJZdaNk9rHW9M.f1CRMAlCDiP2'

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        
        assert.ok(result.length > 10)
    })

    it('deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })
})