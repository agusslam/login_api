const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const cors=require("cors")
const port = 8008

const routes = require('./Routes/routes')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(routes)

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

//models
const ConnectionMongoDB = require('./Models/connection')
ConnectionMongoDB()