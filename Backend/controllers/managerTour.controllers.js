const { addTour, updateTour } = require("../models/managerTour.models");
const Tour = require("../models/managerTour.models");

module.exports.getTourById = async(req, res) => {

    let idTour = req.params.idTour;
    console.log(idTour)
    await Tour
        .getTourById(idTour)
        .then((result) => res.send(result.recordsets[0][0]))
        .catch((error) => res.status(401).send({ message: error }));
}

module.exports.getAllListTour = async(req, res) => {
    await Tour
        .getAllListTour()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};

module.exports.getTourByAll = async(req, res) => {
    await Tour
        .getTourByAll()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};

module.exports.createTour = async(req, res) => {
    try {
        let addtour = req.body;
        addTour(addtour)
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
module.exports.putTour = async(req, res) => {
    try {
        const updatetour = req.body;
        updateTour(updatetour)
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