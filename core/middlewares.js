
let objConfig = require('./database');
class Middlewares {
    async objDB () {
        try {
            await objConfig.getConnection()
        } catch (error) {
            throw error
        }
    }
}

module.exports = Middlewares