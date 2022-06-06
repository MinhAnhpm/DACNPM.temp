const statistical = require("../models/statistical.models");

module.exports.totalTour = async(req, res) => {
    await statistical
        .totalTour()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};
module.exports.totalBookTour = async(req, res) => {
    await statistical
        .totalBookTour()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};
module.exports.totalIncome = async(req, res) => {
    await statistical
        .totalIncome()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};
module.exports.totalCustomer = async(req, res) => {
    await statistical
        .totalCustomer()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};
module.exports.totalProduct = async(req, res) => {
    await statistical
        .totalProduct()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};
module.exports.getTotalByYearMonth = async(req, res) => {
    await statistical
        .getTotalByYearMonth()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};
module.exports.totalByMonth = async(req, res) => {
    let Year = req.params.Year;
    console.log(Year)
    await statistical
        .totalByMonth(Year)
        .then((result) => res.send(result.recordsets[0][0]))
        .catch((error) => res.status(401).send({ message: error }));
}
module.exports.bestSellingProduct = async(req, res) => {
    await statistical
        .bestSellingProduct()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};
module.exports.bestSellingTour = async(req, res) => {
    await statistical
        .bestSellingTour()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};