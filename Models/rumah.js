const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema(
    {
        tipe: { type: String, required: true },
        namarumah: { type: String, required: true },
        // developer: { type: String, required: true },
        lokasi: { type: String, required: true },
        harga: { type: String, required: true },
        luas_tanah: { type: String, required: true },
        luas_bangunan: { type: String, required: true },
        jumlah_kamar: { type: String, required: true },
        alamat: { type: String, required: true },
        listrik: { type: String, required: true },
        pdam: { type: String, required: true },
        telepon: { type: String, required: true },
        legalitas: { type: String, required: true },
        image: { type: String },
        blok: { type: String, required: true },
        status: { type: String, required: true },
        developer: {type: Mongoose.Schema.Types.ObjectId, ref: "tdeveloper"}
    },
    {
        timestamps: true
      }
)

//nama database
const Trumah = Mongoose.model('trumah', Schema)

module.exports = Trumah