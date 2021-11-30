const rumahModel = require('../Models/rumah')
const developModel = require('../Models/developer')
const path = require('path')
const fs = require('fs')

exports.newRumah = async (req, res) => {
    const rumahPost = new rumahModel({
        tipe: req.body.tipe,
        namarumah: req.body.namarumah,
        lokasi: req.body.lokasi,
        harga: req.body.harga,
        developer: req.body.iddev,
        luas_tanah: req.body.luastanah,
        jumlah_kamar: req.body.jumlahkamar,
        alamat: req.body.alamat,
        listrik: req.body.listrik,
        pdam: req.body.pdam,
        telepon: req.body.telepon,
        legalitas: req.body.legalitas,
        luas_bangunan: req.body.luasbangunan,
        status: 1
    })
    try {
        if (req.userId === null || req.userId === undefined) {
            res.status(403).send({ message: 'Not Authorize', status: 403 })
        } else if (req.role !== 'admin') {
            res.status(403).send({ message: 'Not Authorize', status: 403 })
        } else {
            const newHouse = await rumahPost.save()
            res.status(200).send({ message: 'Success Add New House', status: 200, result: newHouse })
        }
    } catch (error) {
        res.status(400).send({ message: 'Failed Add New House'+error.message, status: 400 })
    }
}

exports.listRumah = async (req, res) => {
    try {
        // const list = await rumahModel.find({}, { alamat: 0, listrik: 0, pdam: 0, telepon: 0, legalitas: 0, blok: 0 })
        const list = await rumahModel.find({}, { listrik: 0, pdam: 0, telepon: 0, legalitas: 0, blok: 0 }).populate('developer')
        res.status(200).send({
            message: 'Successful get all data',
            status: 200,
            result: list
        })
    } catch (error) {
        res.status(400).send({ message: error.message , status: 400 })
    }
}

exports.detailRumah = async (req, res) => {
    try {
        const detail = await rumahModel.findOne({ _id: req.params.id }).populate('developer')
        res.status(200).send({ message: "Successfull Get Data", status: 200, result: detail })
    } catch (error) {
        res.status(400).send({ message: 'Failed get Data', status: 400 })
    }
}

exports.updateRumah = async (req, res) => {
    try {
        const data = {
            tipe: req.body.tipe,
            namarumah: req.body.namarumah,
            developer: req.body.iddev,
            lokasi: req.body.lokasi,
            harga: req.body.harga,
            luas_tanah: req.body.luastanah,
            luas_bangunan: req.body.luasbangunan,
            jumlah_kamar: req.body.jumlahkamar,
            alamat: req.body.alamat,
            listrik: req.body.listrik,
            pdam: req.body.pdam,
            telepon: req.body.telepon,
            legalitas: req.body.legalitas,
            blok: req.body.blok
        }
        if (req.role !== 'admin') {
            res.status(403).send({ message: 'Failed Update Data', status: 403 })
        } else {
            const updateData = await rumahModel.updateOne({ _id: req.params.id }, { $set: data }, { upsert: true })
            res.status(200).send({ message: 'Success Update Data', status: 200 })
        }
    } catch (error) {
        res.status(200).send({ message: 'Failed Update Data', status: 400 })
    }
}

exports.getSingleImage = (req, res) => {
    const imageFile = req.params.id
    fs.readFile(`./public/upload_rumah/${imageFile}`, (err,data) => {
        if(err){
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'image/jpeg'
        })
        res.end(data)
    })
}