const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const Member = require('./api/models/VotingModel')

let app = express()

// Sai do sử dụng db trên cluster 2,
// nhưng nó lại không có, lol!
const uri = 'mongodb://54.244.204.28:27017/votingdb'

mongoose.Promise = global.Promise
mongoose.connect(uri, { useMongoClient: true })


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Origin', 'https://ngogiatu-fireprom-vue.herokuapp.com/');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const routes = require('./api/routes/VotingRoutes')
routes(app) // register the router

const PORT = process.env.PORT || 3103;
app.listen(PORT, () => {
    console.log(`API server started on: ${PORT}`)
})