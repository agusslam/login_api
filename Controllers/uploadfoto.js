const util = require("util");
const multer = require("multer");
const path = require('path')
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "./public/foto"); },
  filename: (req, file, cb) => {
    let filename = 'foto-'+Date.now()+path.extname(file.originalname)
    // let filename = file.originalname + path.extname(file.originalname)
    cb(null,filename)},});

let uploadFile = multer({ storage: storage, limits: { fileSize: maxSize }, }).single("foto");

let UploadFoto = util.promisify(uploadFile);
module.exports = UploadFoto;