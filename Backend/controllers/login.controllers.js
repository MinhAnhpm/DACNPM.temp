const dotenv = require("dotenv");
dotenv.config();
const saltRounds = 10;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAccount, resgisterAccuont } = require("../models/login.models");

module.exports.createAccount = (req, res) => {
    let checkPhone = new RegExp(/^(0[3|5|7|8|9])+([0-9]{8})\b$/);
    let checkEmail = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (checkPhone.test(req.body.userName)) {
        try {
            let body = req.body;
            let salt = bcrypt.genSaltSync(saltRounds);
            let hashPass = bcrypt.hashSync(body.passWord, salt);
            body.passWord = hashPass;
            resgisterAccuont(body)
                .then((result) => {
                    res.send({
                        message: "successfully",
                    });
                })
                .catch((error) => {
                    res.status(400).send({
                        message: error,
                    });
                });
        } catch (error) {
            return res.status(400).send({
                message: error,
            });
        }
    } else if (checkEmail.test(req.body.soDienThoai)) {
        try {
            let body = req.body;
            let salt = bcrypt.genSaltSync(saltRounds);
            let hashPass = bcrypt.hashSync(body.passWord, salt);
            body.passWord = hashPass;
            resgisterAccuont(body)
                .then((result) => {
                    res.send({
                        message: "successfully",
                    });
                })
                .catch((error) => {
                    res.status(400).send({
                        message: error,
                    });
                });
        } catch (error) {
            return res.status(400).send({
                message: error,
            });
        }
    } else {
        return res.status(400).send({
            message: "Sai dinh dang so dien thoai hoac email",
        });
    }
};

module.exports.login = async(req, res) => {
    let account = {
        userName: req.body.soDienThoai,
        passWord: req.body.passWord,
    };
    try {
        await getAccount(account.soDienThoai)
            .then((result) => {
                if (result.recordset.length > 0) {
                    let acc = result.recordset[0];
                    let checkPass = bcrypt.compareSync(account.passWord, acc.passWord);
                    acc.passWord = undefined;
                    acc.email = undefined;
                    if (checkPass) {
                        let token = jwt.sign(acc, process.env.SECRET_KEY);
                        return res.send({
                            user: JSON.parse(JSON.stringify(acc)),
                            token: token,
                        });
                    } else {
                        return res.status(403).send({
                            message: "Wrong password or email",
                        });
                    }
                } else {
                    return res.status(404).send({
                        message: "No find account",
                    });
                }
            })
            .catch((error) => {
                res.status(400).send({
                    message: error,
                });
            });
    } catch (error) {
        res.status(400).send({
            message: error,
        });
    }
};