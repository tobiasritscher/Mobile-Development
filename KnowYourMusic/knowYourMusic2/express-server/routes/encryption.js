const bcrypt = require('bcrypt');

function createHash(text) {
    let saltRounds = 12
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(text,salt)
    return hash
}

function comparePassword(myPlaintextPassword,hash) {
// Load hash from your password DB.
    let result = bcrypt.compareSync(myPlaintextPassword,hash)
    return result
}

exports.createHash = createHash
exports.comparePassword = comparePassword