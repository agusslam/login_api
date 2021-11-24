const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema(
    {
    uid: {type:String, required: true},
    idrumah: {type:String, required: true, type: Mongoose.Schema.Types.ObjectId, ref: "trumah"},
    formkredit: {type:String, required: true},
    ektp: {type:String, required: true},
    slip: {type:String, required: true},
    rk: {type:String, required: true},
    foto: {type:String, required: true},
    status: {type:String, required: true} 
    },
    {
        timestamps: true
      }
)

//nama database
const Tkpr = Mongoose.model('tkpr', Schema)

module.exports = Tkpr
