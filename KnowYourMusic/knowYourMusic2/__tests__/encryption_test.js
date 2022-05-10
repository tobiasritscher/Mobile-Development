const encryption = require("../express-server/routes/encryption")

describe("password hashing", () => {
    let password = "testing"

    it("should see it's the same password", async () => {
        let hash = encryption.createHash(password)
        let result = encryption.comparePassword(password,hash)
        expect(result).toEqual(true)
    })

    it("it should see it's the wrong password", async () => {
        let wrongPassword = "not testing"
        let hash = encryption.createHash(password)
        let result = encryption.comparePassword(wrongPassword,hash)
        expect(result).toEqual(false)
    })
})