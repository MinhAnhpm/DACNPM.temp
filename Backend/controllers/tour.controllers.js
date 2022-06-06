const tour = require("../models/tour.models");


module.exports.getListTour = async (req, res) => {
  let idTypeTour = req.query.idTypeTour;
  await tour
    .getListTour(idTypeTour)
    .then((result) => res.send(result.recordsets[0]))
    .catch((error) => res.status(400).send({ message: error }));
};

module.exports.getAllListTour = async (req, res) => {
  await tour
    .getAllListTour()
    .then((result) => res.send(result.recordsets[0]))
    .catch((error) => res.status(401).send({ message: error }));
};

module.exports.getContentTour = async (req, res) => {
  let idTour = req.query.idTour;
  await tour
    .getContentTour(idTour)
    .then((result) => res.send(result.recordsets[0][0]))
    .catch((error) => res.status(401).send({ message: error }));
};


module.exports.getListTypeTour = async (req, res) => {
  try {
    const listType = (await tour.getListTypeTour()).recordset;
    return res.send(listType);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports.getThongTinXuatPhat = async (req, res) => {
  try {
    const listXuatPhat = (await tour.getThongTinXuatPhat(req.query.maTour))
      .recordset;
    return res.send(listXuatPhat);
  } catch (error) {
    return res.status(500).send(error);
  }
};

