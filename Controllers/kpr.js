const kprModel = require('../Models/kpr')
const uploadImg = require('../Controllers/upload')
const UploadEktp = require('../Controllers/uploadktp')
const UploadFOto = require('../Controllers/uploadfoto')
const UploadRKA = require('../Controllers/uploadrk')
const UploadSLP = require('../Controllers/uploadslip')
const fs = require('fs')

exports.uploadFormKPR = async (req, res) => {
    try {
        const upload = await uploadImg(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload Image", status: 200, fileName: req.file.filename })
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.uploadEktp = async (req, res) => {
    try {
        const upload = await UploadEktp(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload EKTP", status: 200, fileName: req.file.filename })
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.uploadFoto = async (req, res) => {
    try {
        const upload = await UploadFOto(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload Foto", status: 200, fileName: req.file.filename })
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.uploadRk = async (req, res) => {
    try {
        const upload = await UploadRKA(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload RK", status: 200, fileName: req.file.filename })
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.uploadSlip = async (req, res) => {
    try {
        const upload = await UploadSLP(req, res)
        // console.log(req.file.filename)
        res.status(200).send({ message: "Success Upload Slip Gaji", status: 200, fileName: req.file.filename })
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.newKPR = async (req, res) => {
    const kprPost = new kprModel({
        uid: req.userId,
        iddebitur: req.body.idDebitur,
        namadebitur: req.body.namadebitur,
        idrumah: req.body.id,
        formkredit: req.body.formkredit,
        ektp: req.body.ektp,
        slip: req.body.slip,
        rk: req.body.rk,
        foto: req.body.foto,
        status: req.body.status,
        statuskredit: "Start Pengajuan"
    })
    try {
        const KPR = await kprPost.save()
        res.status(200).send({ message: 'Success Add KPR', status: 200 })
    } catch (error) {
        res.status(400).send({ message: 'Failed Add New KPR', status: 400 })
    }
}

exports.infoKPR = async (req, res) => {
    try {
        // const list = await rumahModel.find({}, { alamat: 0, listrik: 0, pdam: 0, telepon: 0, legalitas: 0, blok: 0 })
        const list = await kprModel.findOne({ uid: req.userId }).populate([{ path: 'idrumah', populate: { path: 'developer' } }])
        // console.log(list)
        if (list === null) {
            res.status(200).send({ 
                message: 'Not Found Data',
                status: 200,
                result: null
            })
        } else {
            res.status(200).send({
                message: 'Successful get data',
                status: 200,
                result: list
            })
        }
    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 })
    }
}

exports.infoKPRperson = async (req, res) => {
    try {
        if (req.role === "admin") {
            const list = await kprModel.findOne({ _id: req.params.id }).populate([{ path: 'idrumah', populate: { path: 'developer' } }])
            res.status(200).send({
                message: 'Successful get data',
                status: 200,
                result: list
            })
        } else {
            res.status(403).send({ message: 'Not Authorize For Get Data', status: 403 })
        }
        // const list = await rumahModel.find({}, { alamat: 0, listrik: 0, pdam: 0, telepon: 0, legalitas: 0, blok: 0 })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 })
    }
}

exports.getKPR = async (req, res) => {
    try {
        if (req.role === "admin") {
            // const list = await kprModel.find()
            const list = await kprModel.find({ status: '0' }).populate([{ path: 'idrumah', populate: { path: 'developer' } }])
            res.status(200).send({
                message: 'Successful get all data',
                status: 200,
                result: list
            })
        } else {
            res.send({ message: "Not Authorize", status: 403 });
        }
    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 })
    }
}

exports.getFormKPR = (req, res) => {
    const idForm = req.params.id
    fs.readFile(`./public/formKPR/${idForm}`, (err,data) => {
        if(err){
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'application/pdf'
        })
        res.end(data)
    })
}

exports.getKTP = (req, res) => {
    const idKTP = req.params.id
    fs.readFile(`./public/EKTP/${idKTP}`, (err,data) => {
        if(err){
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'image/jpeg'
        })
        res.end(data)
    })
}

exports.getSlip = (req, res) => {
    const idForm = req.params.id
    fs.readFile(`./public/slip/${idForm}`, (err,data) => {
        if(err){
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'application/pdf'
        })
        res.end(data)
    })
}

exports.getRK = (req, res) => {
    const idForm = req.params.id
    fs.readFile(`./public/RK/${idForm}`, (err,data) => {
        if(err){
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'application/pdf'
        })
        res.end(data)
    })
}

exports.getFoto = (req, res) => {
    const idForm = req.params.id
    fs.readFile(`./public/foto/${idForm}`, (err,data) => {
        if(err){
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'image/jpeg'
        })
        res.end(data)
    })
}

exports.flagKPR = async (req, res) => {
    try {
        if (req.userId === null || req.userId === undefined) {
            res.status(403).send({ message: 'Not Authorize', status: 403 })
        } else if (req.role !== 'admin') {
            res.status(403).send({ message: 'Not Authorize', status: 403 })
        } else {
            let pengajuan = req.body.pengajuan
            let admin = req.body.administrasi
            let aksep = req.body.aksep
            let slik = req.body.slik
            let legal = req.body.legal
            let komite = req.body.komite
            let setuju = req.body.setuju
            switch (true) {
                case (pengajuan === true && admin === '' && aksep === '' && slik === '' && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Verifikasi AO : Sukses"
                    break;
                case (pengajuan === true && admin === "admin1" && aksep === '' && slik === '' && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Cek Administrasi : Proses"
                    break;
                case (pengajuan === true && admin === "admin2" && aksep === '' && slik === '' && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Cek Administrasi : Diterima"
                    break;
                case (pengajuan === true && admin === "admin3" && aksep === '' && slik === '' && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Cek Administrasi : Ditolak"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && aksep === "aksep1" && slik === '' && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Financial Aksep : Proses"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && aksep === "aksep2" && slik === '' && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Financial Aksep : Diterima"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && aksep === "aksep3" && slik === '' && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Financial Aksep : Ditolak"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && slik === "slik1" && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Cek SLIK : Diproses"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && slik === "slik2" && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Cek SLIK : Diterima"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && slik === "slik3" && legal === '' && komite === '' && setuju === ''):
                    newstatus = "Cek SLIK : Ditolak"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && (slik === "slik1" || slik === "slik2" || slik === "slik3") && legal === "legal1" && komite === '' && setuju === ''):
                    newstatus = "Cek LEGAL : Diproses"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && (slik === "slik1" || slik === "slik2" || slik === "slik3") && legal === "legal2" && komite === '' && setuju === ''):
                    newstatus = "Cek LEGAL : Diterima"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && (slik === "slik1" || slik === "slik2" || slik === "slik3") && legal === "legal3" && komite === '' && setuju === ''):
                    newstatus = "Cek LEGAL : Ditolak"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && (slik === "slik1" || slik === "slik2" || slik === "slik3") && (legal === "legal1" || legal === "legal2" || legal === "legal3") && komite === 'komite1' && setuju === ''):
                    newstatus = "Komite Kredit : Diproses"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && (slik === "slik1" || slik === "slik2" || slik === "slik3") && (legal === "legal1" || legal === "legal2" || legal === "legal3") && komite === 'komite2' && setuju === ''):
                    newstatus = "Komite Kredit : Diterima"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && (slik === "slik1" || slik === "slik2" || slik === "slik3") && (legal === "legal1" || legal === "legal2" || legal === "legal3") && komite === 'komite3' && setuju === ''):
                    newstatus = "Komite Kredit : Ditolak"
                    break;
                case (pengajuan === true && (admin === "admin1" || admin === "admin2" || admin === "admin3") && (aksep === "aksep1" || aksep === "aksep2" || aksep === "aksep3") && (slik === "slik1" || slik === "slik2" || slik === "slik3") && (legal === "legal1" || legal === "legal2" || legal === "legal3") && (komite === "komite1" || komite === "komite2" || komite === "komite3") && setuju === true):
                    newstatus = "KPR Disetujui"
                    break;
                default:
                    newstatus = "Start Pengajuan"
            }

            data = {
                'pengajuan.0.status': req.body.pengajuan,
                'pengajuan.0.date': Date(),
                statuskredit: newstatus,
                'administrasi.0.status': req.body.administrasi,
                'administrasi.0.date': Date(),
                'aksep.0.status': req.body.aksep,
                'aksep.0.date': Date(),
                'slik.0.status': req.body.slik,
                'slik.0.date': Date(),
                'legal.0.status': req.body.legal,
                'legal.0.date': Date(),
                'komite.0.status': req.body.komite,
                'komite.0.date': Date(),
                'setuju.0.status': req.body.setuju,
                'setuju.0.date': Date()
            }
            console.log(data)

            const flagStatus = await kprModel.updateOne({ _id: req.body.id }, { $set: data }, { upsert: true })
            res.status(200).send({ message: 'Success Update Data', status: 200, result: flagStatus })
        }
    } catch (error) {
        res.status(400).send({ message: 'Failed Update Data' + error.message, status: 400 })
    }
}
