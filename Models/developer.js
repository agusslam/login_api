const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema(
    {
    iddev:{type:String, required: true},
    namadeveloper: {type:String, required: true},
    alamatdeveloper: {type:String, required: true},
    telepondeveloper: {type:String, required: true},
    emaildeveloper: {type:String, required: true},
    lokasideveloper: {type:String, required: true},
    // developer: {type: Mongoose.Schema.Types.ObjectId, ref: "rumah"}
    }
)

//nama database
const Tdeveloper = Mongoose.model('tdeveloper', Schema)

module.exports = Tdeveloper
