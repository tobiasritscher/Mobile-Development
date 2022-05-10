const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://zunft1:zunft1@zunftapp.fvyph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let connection;
let db;

describe("insert", () => {
    let users;
    beforeAll(async () => {
        connection = await MongoClient.connect(uri, {
            useNewUrlParser: true,
        });
        db = await connection.db("ZunftDB");
        users = db.collection("Personen");
    });

    afterAll(() => {
        connection.close();
        db.close();
    });

    let person = {
        _id: 7,
        first_name: "Joel",
        last_name: "Plambeck",
        email: "duckin@works",
        phone: ["0790", "het sie gseit"],
        picture: "////",
        password: "dcfvgbhnjmk",
        birthday: "03201.5010",
        profession: "bibi",
        settings: {
            wantsNotifications: true,
            autologinEnabled: true
        }
    }

    it("deletes user if exists", async () => {
        let alreadyExists = await users.findOne({ _id: person._id });
        if (alreadyExists != null) {
            console.log("Deleting user...")
            await users.deleteOne({_id: person._id});
        } else {
            console.log(person.first_name + " " + person.last_name + " not found in Database");
        }
        let deletedUser = await users.findOne({ _id: person._id });
        expect(deletedUser).toEqual(null);
    })

    it("insert user", async () => {
        const alreadyExists = await users.findOne({ _id: person._id });
        if (alreadyExists == null) {
            console.log("inserting user...")
            await users.insertOne(person);
        } else {
            console.log(person.first_name + " " + person.last_name + " already exists");
        }

        const insertedUser = await users.findOne({ _id: person._id });
        expect(insertedUser).toEqual(person);
    });

});