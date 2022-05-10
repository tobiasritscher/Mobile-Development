const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://zunft1:zunft1@zunftapp.fvyph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let connection;
let db;
let people;
let clubs;
let events;

async function main() {
    await connectToDb(connection, db)
    init(people, clubs, events, db)
    closeConnection(connection)
}

main().catch(console.error)

function closeConnection() {
    connection.close()
}

function init() {
    people = db.collection("Personen")
    clubs = db.collection("Clubs")
    events = db.collection("Events")
}

async function connectToDb() {
    connection = await MongoClient.connect(uri, {
        useNewUrlParser: true,
    });
    db = await connection.db("ZunftDB");

}

async function getPerson(people, id) {
    return await people.findOne({_id: id})
}

async function getClub(clubs, club_id) {
    return await clubs.findOne({club_id: club_id})
}

async function getEvent(events, id) {
    return await events.findOne({_id: id})
}

async function createPerson(people, person) {
    let someone = await people.findOne({_id: person._id})
    if (someone == null) {
        await people.insertOne(person)
    } else {
        console.log("Person exists already")
    }
}

async function deletePerson(people, person) {
    let someone = await people.findOne({_id:person._id})
    if (someone != null) {
        await people.deleteOne(person)
    } else {
        console.log("Person isn't in the DataBase to begin with")
    }
}

async function deleteClub(clubs, club) {
    let someone = await clubs.findOne({club_id:club.club_id})
    if (someone != null) {
        await clubs.deleteOne(club)
    } else {
        console.log("Club isn't in the DataBase to begin with")
    }
}

async function createClub(clubs, club) {
    let someone = await clubs.findOne({club_id:club.club_id})
    if (someone == null) {
        await clubs.insertOne(club)
    } else {
        console.log("Club exists already")
    }
}

async function createEvent(events, event) {
    let someone = await events.findOne({_id:event._id})
    if (someone == null) {
        await events.insertOne(event)
    } else {
        console.log("Event exists already")
    }
}

async function deleteEvent(events, event) {
    let someone = await events.findOne({_id:event._id})
    if (someone != null) {
        await events.deleteOne(event)
    } else {
        console.log("Event isn't in the DataBase to begin with")
    }
}

exports.getPerson = getPerson
exports.createEvent = createEvent
exports.deleteEvent = deleteEvent
exports.createClub = createClub
exports.deleteClub = deleteClub
exports.deletePerson = deletePerson
exports.createPerson = createPerson
exports.getEvent = getEvent
exports.getClub = getClub
exports.connectToDb = connectToDb
exports.init = init
exports.closeConnection = closeConnection