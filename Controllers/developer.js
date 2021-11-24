const developModel = require('../Models/developer')

exports.newDev = async (req, res) => {
    const devPost = new developModel({
        iddev: req.body.iddev,
        namadeveloper: req.body.namadeveloper,
        alamatdeveloper: req.body.alamatdeveloper,
        telepondeveloper: req.body.telepondeveloper,
        emaildeveloper: req.body.emaildeveloper,
        lokasideveloper: req.body.lokasideveloper
    })
    try {
        if(req.userId === null || req.userId === undefined){
            res.status(403).send({ message: 'Failed Add Developer', status: 403 })
        }else if(req.role !== 'admin'){
            res.status(403).send({ message: 'Failed Add Developer', status: 403 })
        }else {
            const newDev = await devPost.save()
            res.status(200).send({ message: 'Success Add Developer', status: 200, result: newDev })
        }
    } catch (error) {
        res.status(400).send({ message: 'Failed Add Developer', status: 400 })
    }

}

exports.listDev = async (req, res) => {
    try {
        const list = await developModel.find()
        res.status(200).send({ message: 'Successfull Get Data', status: 200, result: list })
    } catch (error) {
        res.status(400).send({ message: "Failed Get Data", status: 400 })
    }
}