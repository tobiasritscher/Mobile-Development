const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const uri = "mongodb+srv://zunft1:zunft1@zunftapp.fvyph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DB_NAME = "ZunftDB"
const USER_TABLE = "Personen"
const CLUBS_TABLE = "Clubs"
const EVENTS_TABLE = "Events"
const encryption = require("./encryption")

class Database {

    constructor() {
        this.connectToDb();
    }

    async connectToDb() {
        this.connection = await MongoClient.connect(uri, {
            useNewUrlParser: true,
        });
        this.db = await this.connection.db(DB_NAME);
        console.log("Connected to database!");
        this.users = this.db.collection(USER_TABLE)
        this.clubs = this.db.collection(CLUBS_TABLE)
        this.events = this.db.collection(EVENTS_TABLE)
    }

    async getUsers() {
        var found = await this.users.find({}).toArray()
        return found;
    }

    async getUser(id) {
        return await this.users.findOne({_id: new ObjectId(id)});
    }

    async getUserByEmail(email) {
        return await this.users.findOne({email: email});
    }

    async createUser(person) {
        let alreadyExists = this.getUser({first_name:person.first_name,last_name:person.last_name,birthday:person.birthday});
        if (alreadyExists == null) {
            person.password = encryption.createHash(person.password)
            await this.users.insertOne(person)
            return true
        } else {
            return false
        }


    }

    async updateUser(id, update){
        let that = this
        this.users.findOneAndUpdate({_id: new ObjectId(id)}, update).then(function (user){
            return that.getUser(id)
        })
    }

    async deleteUser(person) {
        let alreadyExists = this.getUser(person._id);
        if (alreadyExists != null) {
            await this.users.deleteOne({_id: new ObjectId(person._id)})
            return true
        } else {
            console.log("Person isn't in the DataBase to begin with")
            return false
        }
    }

    async getClub(id) {
        return await this.clubs.findOne({_id: parseInt(id)});
    }

    async updateClub(id, update){
        let that = this
        this.clubs.findOneAndUpdate({_id: new ObjectId(id)}, update).then(function (clubs){
            return that.getClub(id)
        })
    }
    async deleteClub(club) {
        let alreadyExists = this.getClub(club._id);
        if (alreadyExists != null) {
            await this.clubs.deleteOne({_id: parseInt(club._id)})
            return true
        } else {
            return false
        }
    }

    async createClub(club) {
        let alreadyExists = this.getClub({_id:club._id});
        if (alreadyExists == null) {
            await this.clubs.insertOne(club)
            return true
        } else {
            return false
        }


    }

    async getClubs() {
        return await this.clubs.find({}).toArray();
    }

    async getEvent(id) {
        return await this.events.findOne({_id: parseInt(id)});
    }

    async createEvent(event) {
        let alreadyExists = this.getEvent({_id:event._id});
        if (alreadyExists == null) {
            await this.events.insertOne(event)
            return true
        } else {
            return false
        }
    }
    async deleteEvent(event) {
        let alreadyExists = this.getEvent(event._id);
        if (alreadyExists != null) {
            await this.events.deleteOne({_id: parseInt(event._id)})
            return true
        } else {
            return false
        }
    }

    async updateEvent(id, update){
        let that = this
        this.events.findOneAndUpdate({_id: new ObjectId(id)}, update).then(function (clubs){
            return that.getEvent(id)
        })
    }

    async getEvents() {
        return await this.events.find({}).toArray();
    }
}
module.exports = new Database()