const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const cors=require("cors")

app.set('port', (process.env.PORT || 8008))

const routes = require('./Routes/routes')

// const swaggerUi = require('swagger-ui-express')
// const swaggerFile = require('./swagger_output.json')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors()) 

app.use(routes)
app.set('view engine', 'ejs');
app.use('/', express.static('public'));

// app.listen(port,host, () => {
//     console.log(`Server started on ${port}`);
// });

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
})

//models
const ConnectionMongoDB = require('./Models/connection')
ConnectionMongoDB()