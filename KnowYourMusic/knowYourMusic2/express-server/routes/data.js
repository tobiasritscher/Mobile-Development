const router = require('express').Router()
const Joi = require("joi");
const auth = require("../middleware/auth")
const validateWith = require("../middleware/validation");
const database = require("./conn")

//require token for accessing api data
router.use(auth)

const userSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.array().items(Joi.string()),
    picture: Joi.string(),
    password: Joi.string().min(5),
    birthday: Joi.string(),
    profession: Joi.string(),
    roles: Joi.array().items(Joi.string()),
    authorizations: Joi.array().items(Joi.string()),
    settings: {
        wantsNotifications: Joi.boolean(),
        autologinEnabled: Joi.boolean()
    }
})
    .with("password", "email")

router.get("/users", function(req, res, next) {
    database.getUsers().then(function (users) {
        res.send(users)
    }).catch(next)
})

// routes below are needed for future implementation
router.get("/users/:id", function(req, res, next) {
    database.getUser(req.params.id).then(function (user) {
        res.send(user)
    }).catch(next)
})

router.put("/users/:id", validateWith(userSchema), function(req, res, next){
    database.updateUser(req.params.id, req.body).then(function(user){
        res.send(user)
    }).catch(next)
})

router.post("/users", validateWith(userSchema), function (req, res, next) {
    database.createUser(req.body).then(function(successful){
        if (successful){
            res.send("User created")
        } else {
            res.status(401).send("User already exists")
        }
    })
})

router.get("/events", function(req, res, next) {
    database.getEvents().then(function (events) {
        res.send(events)
    }).catch(next)
})

router.get("/events/:id", function(req, res, next) {
    database.getEvent(req.params.id).then(function (event) {
        res.send(event)
    }).catch(next)
})

router.get("/clubs", function(req, res, next) {
    database.getClubs().then(function (clubs) {
        res.send(clubs)
    }).catch(next)
})

router.get("/clubs/:id", function(req, res, next) {
    database.getClub(req.params.id).then(function (club) {
        res.send(club)
    }).catch(next)
})

module.exports = router