const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema(
    {
    username:{type:String, required: true},
    password: {type:String, required: true},
    nama: {type:String, required: true},
    email: {type:String, required: true},
    phone: {type:String, required: true},
    avatar: {type:String},
    role: {type:String, required: true}
    }
)

//nama database
const Tuser = Mongoose.model('tuser', Schema)

module.exports = Tuser
