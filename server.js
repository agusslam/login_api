const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const cors=require("cors")
const host = '0.0.0.0'
const port = 3000

const routes = require('./Routes/routes')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(routes)

app.listen(port,host, () => {
    console.log(`Server started on ${port}`);
});

//models
const ConnectionMongoDB = require('./Models/connection')
ConnectionMongoDB()