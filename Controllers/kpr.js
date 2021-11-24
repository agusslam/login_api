const kprModel = require('../Models/kpr')
const uploadImg = require('../Controllers/upload')
const UploadEktp = require('../Controllers/uploadktp')
const UploadFOto = require('../Controllers/uploadfoto')
const UploadRKA = require('../Controllers/uploadrk')
const UploadSLP = require('../Controllers/uploadslip')

exports.uploadFormKPR = async (req, res) => {
    try {
        const upload = await uploadImg(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload Image", status: 200, fileName:  req.file.filename})
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.uploadEktp = async (req, res) => {
    try {
        const upload = await UploadEktp(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload EKTP", status: 200, fileName:  req.file.filename})
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.uploadFoto = async (req, res) => {
    try {
        const upload = await UploadFOto(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload Foto", status: 200, fileName:  req.file.filename})
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.uploadRk = async (req, res) => {
    try {
        const upload = await UploadRKA(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload Foto", status: 200, fileName:  req.file.filename})
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.uploadSlip = async (req, res) => {
    try {
        const upload = await UploadSLP(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload Foto", status: 200, fileName:  req.file.filename})
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.newKPR = async (req, res) => {
    const kprPost = new kprModel({
        uid: req.userId,
        idrumah: req.body.id,
        formkredit: req.body.formkredit,
        ektp: req.body.ektp,
        slip: req.body.slip,
        rk: req.body.rk,
        foto: req.body.foto,
        status: req.body.status
    })
    try {
        const KPR = await kprPost.save()
        res.status(200).send({ message: 'Success Add KPR', status: 200 })
    } catch (error) {
        res.status(400).send({ message: 'Failed Add New House', status: 400 })
    }
}

exports.infoKPR = async (req, res) => {
    try {
        // const list = await rumahModel.find({}, { alamat: 0, listrik: 0, pdam: 0, telepon: 0, legalitas: 0, blok: 0 })
        const list = await kprModel.findOne( { uid: req.userId })
        res.status(200).send({
            message: 'Successful get all data',
            status: 200
        })
    } catch (error) {
        res.status(400).send({ message: error.message , status: 400 })
    }
}
