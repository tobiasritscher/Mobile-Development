const mongoose = require('mongoose')

const url = `mongodb+srv://zunft1:zunft1@zunftapp.fvyph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams=('mongodb://localhost:27017/test',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })