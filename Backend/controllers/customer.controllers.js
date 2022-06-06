const { addInfoCustomer, updateCustomer } = require("../models/customer.models");
const Customer = require("../models/customer.models");


module.exports.createInfoCustomer = async(req, res) => {
    try {
        let account = req.body;
        addInfoCustomer(account)
            .then((result) => {
                res.send({
                    message: "successfully",
                });
            })
    } catch (error) {
        return res.status(400).send({
            message: error,
        });
    };
};

module.exports.getAllListCustomer = async(req, res) => {
    await Customer
        .getAllListCustomer()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};

module.exports.getCustomerById = async(req, res) => {

    let idCustomer = req.params.idCustomer;
    console.log(idCustomer)
    await Customer
        .getCustomerById(idCustomer)
        .then((result) => res.send(result.recordsets[0][0]))
        .catch((error) => res.status(401).send({ message: error }));
};

module.exports.putCustomer = async(req, res) => {
    try {
        let update = req.body;
        updateCustomer(update)
            .then((result) => {
                res.send({
                    message: "successfully",
                });
            })
    } catch (error) {
        return res.status(400).send({
            message: error,
        });
    };
};