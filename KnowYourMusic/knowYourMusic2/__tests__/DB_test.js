const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://zunft1:zunft1@zunftapp.fvyph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DB = require('../express-server/routes/DB')

describe("insert", () => {
    let db
    let connection
    let people
    let clubs
    let events

    beforeAll(async () => {
        connection = await MongoClient.connect(uri, {
            useNewUrlParser: true,
        });
        db = await connection.db("ZunftDB");
        people = db.collection("Personen")
        clubs = db.collection("Clubs")
        events = db.collection("event")
    })
    afterAll(() => {
        connection.close()
    });

    it("gets user if exists", async () => {
        let person = await DB.getPerson(people, 7)
        let joel = {
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
        expect(person).toEqual(joel)

    })

    it("extra manipulation", async () => {
        let test = {
            _id: 10,
            first_name: "Erman",
            last_name: "Zankov",
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
        await DB.createPerson(people, test)
        let person = await DB.getPerson(people,10)
        expect(person).toEqual(test)
        await DB.deletePerson(people,person)
        let noone = await DB.getPerson(people,9)
        expect(noone).toEqual(null)
    })

    it("puts an user", async () => {
        let erman = {
            _id: 666,
            first_name: "Erman",
            last_name: "Longboiiii",
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

        await DB.createPerson(people,erman)
        let person = await DB.getPerson(people,666)
        expect(person).toEqual(erman)
    })
})
