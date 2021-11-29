const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema(
    {
    uid: {type:String, required: true},
    iddebitur: {type:String, required: true, type: Mongoose.Schema.Types.ObjectId, ref: "tuser"},
    namadebitur: {type:String, required: true},
    idrumah: {type:String, required: true, type: Mongoose.Schema.Types.ObjectId, ref: "trumah"},
    formkredit: {type:String, required: true},
    ektp: {type:String, required: true},
    slip: {type:String, required: true},
    rk: {type:String, required: true},
    foto: {type:String, required: true},
    status: {type:String, required: true},
    statuskredit: {type:String},
    pengajuan: [{
      status: {type:Boolean},
      date: {type:String}
    }],
    administrasi: [{
      status: {type:String},
      date: {type:String}
    }],
    aksep: [{
      status: {type:String},
      date: {type:String}
    }],
    slik: [{
      status: {type:String},
      date: {type:String}
    }],
    legal: [{
      status: {type:String},
      date: {type:String}
    }],
    komite: [{
      status: {type:String},
      date: {type:String}
    }],
    setuju: [{
      status: {type:String},
      date: {type:String}
    }],
    },
    {
        timestamps: true
      }
)

//nama database
const Tkpr = Mongoose.model('tkpr', Schema)

module.exports = Tkpr
