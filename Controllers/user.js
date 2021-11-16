const userModel = require('../Models/user')
const jwt = require('jsonwebtoken')
const verifyToken = require('../Controllers/verifyToken')
const { find } = require('../Models/user')

// API for register
exports.new = async (req, res) => {
    const userPost = new userModel({
        username: req.body.username,
        password: req.body.password,
        nama: req.body.nama,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar,
        role: req.body.role
    })
    try {
        const userSearch = await userModel.findOne({ username: req.body.username })
        const emailSearch = await userModel.findOne({ email: req.body.email })
        if (userSearch) {
            res.send({ message: 'User Already Exist', status: 400 })
        } else if (emailSearch) {
            res.send({ message: 'Email Already Exist', status: 400 })
        } else {
            const user = await userPost.save()
            res.send(
                {
                    message: "Success Register",
                    status: 200,
                    result: {
                        username: user.username,
                        nama: user.nama,
                        email: user.email,
                        phone: user.phone,
                        role: user.role
                    }
                });
        }
    } catch (error) {
        res.send({ message: 'Failed Register User', status: 400 });
    }
}

//API for login
exports.login = async (req, res) => {
    try {
        if (!req.body) {
            res.send({ message: 'Failed Login', status: 400 })
        } else {
            if ((req.body.username === '' || req.body.username === null) || (req.body.password === '' || req.body.password === null)) {
                res.send({ message: 'Failed Login', status: 400 })
            } else {
                const userData = await userModel.findOne({ username: req.body.username })
                if (userData === null) {
                    res.send({ message: 'Failed Login', status: 400 })
                } else {
                    if (userData.password !== req.body.password) {
                        res.send({ message: 'Failed Login', status: 400 })
                    } else {
                        let token = jwt.sign(
                            {
                                username: userData.username,
                                email: userData.email,
                                role: userData.role,
                            }, 'keyRahasia-Bangetiniloh,jangn sampai bocor aduhhhhh....!!!', { expiresIn: '1h' })
                        // let passingData = ({ token: token })
                        res.send({ message: 'Success Login', status: 200, token: token });
                    }
                }
            }
        }

    } catch (error) {
        res.send({ message: 'Failed Login User', status: 400 });
    }
}

//API GET PROFILE with JWT
exports.profile = async (req, res) => {
    try {
        if (req.userId === null || req.userId === undefined) {
            res.send({ message: 'Failed Get Profile', status: 400 })
        } else {
            const getProfile = await userModel.findOne({ username: req.userId })
            if (getProfile === null) {
                res.send({ message: 'Failed Get Profile', status: 400 })
            } else {
                res.send({
                    message: 'Success Get Profile',
                    status: 200,
                    result: {
                        _id: getProfile._id,
                        username: getProfile.username,
                        nama: getProfile.nama,
                        email: getProfile.email,
                        phone: getProfile.phone,
                        avatar: getProfile.avatar,
                        role: getProfile.role
                    }
                })
            }
        }

    } catch (error) {
        res.send({ message: 'Failed Get Profile', status: 400 });
    }
}

// API get User List
exports.list = async (req, res) => {
    try {
        if (req.role === "admin") {
            const allData = await userModel.find()
            res.send({ message: "Success Get Data", status: 200,  result: allData });
        }else {
            res.send({ message: "Not Authorize", status: 403 });
        }
    } catch (error) {
        res.send({ message: `Failed : ${error}` });
    }
}












exports.del = async (req, res) => {
    try {
        const userDel = await userModel.deleteOne({ _id: req.body.id })
        res.send({ message: "Success Delete Data", type: 200, result: userDel });
    } catch (error) {
        res.send({ message: `Failed : ${error}` });
    }
}



exports.logout = async (req, res) => {
    let tokenAuth = req.headers.authorization
    let newTokenAuth = tokenAuth.split(' ')

    try {
        res.status(200).send({ message: "Successfuly Logout", status: 200, auth: false })
    } catch (error) {
        res.send({ message: error })
    }
}

exports.userData = async (req, res) => {
    let tokenAuth = req.headers.authorization
    // console.log(tokenAuth)
    // check token
    if (tokenAuth === undefined || tokenAuth === null || tokenAuth === '') {
        res.status(403).send({ message: `failed get data`, status: 403 })
    } else {
        //split token
        let newTokenAuth = tokenAuth.split(' ')
        //cek token is bearer
        if (newTokenAuth[0] != 'Bearer') {
            res.status(403).send({ message: `failed get data`, status: 403 })
        } else {
            //     //cek token
            const token = jwt.verify(newTokenAuth[1], 'keyRahasia-Bangetiniloh,jangn sampai bocor aduhhhhh', (err, result) => {
                if (err) return false
                if (result) return result

            })
            //aksi jika true atau false
            if (!token) {
                res.status(401).send({ message: `failed get data`, status: 401 })
            } else {
                //data yg dikeluarkan bisa apa aja
                try {
                    const allData = await userModel.find()
                    res.status(200).send({ result: allData })
                } catch (error) {
                    res.status(500).send({ message: `failed get data`, status: 500 })
                }
                // const allData = await userModel.find()
                // res.send({ message: "Success Get Data", result: allData });
                // userModel.find().then(response => {
                //     res.send({
                //         message: 'Success get data permissions',
                //         result: response,
                //         status: 200
                //     })
                // })
                // .catch(err => {
                //     res.status(500).send({ message: `failed get data`, status: 500 })
                // })
            }

        }
    }
}

exports.userData2 = async (req, res) => {
    //data yg dikeluarkan bisa apa aja
    try {
        const userSearch = await userModel.findOne({ username: req.userId })
        if (userSearch.role == "member") {
            const allData = await userModel.find()
            res.status(200).send({ auth: "member", result: allData })
        } else {
            const allData = await userModel.find()
            res.status(200).send({ auth: "guest", result: allData })
        }
    } catch (error) {
        res.status(500).send({ message: `failed get data ${error.message}`, status: 500 })
    }
    // const allData = await userModel.find()
    // res.send({ message: "Success Get Data", result: allData });
    // userModel.find().then(response => {
    //     res.send({
    //         message: 'Success get data permissions',
    //         result: response,
    //         status: 200
    //     })
    // })
    // .catch(err => {
    //     res.status(500).send({ message: `failed get data`, status: 500 })
    // })
}

exports.cekToken = async (req, res) => {
    const userSearch = await userModel.findOne({ username: req.userId })
    // console.log(userSearch)
    res.status(200).send({ status: 200, name: userSearch.nama, role: userSearch.role })
}

//FRONT END
exports.vIndex = (req, res) => {
    res.render('index')
}

exports.vLogin = (req, res) => {
    res.render('login')
}



