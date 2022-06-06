const search = require("../models/search.models");
const Fuse = require("fuse.js");

module.exports.searchDiaDiemTour = async (req, res) => {
  try {
    const options = {
      isCaseSensitive: false,
      includeScore: true,
      threshold: 0.6,
      keys: ["tenDiaDiemDuLich", "maDiaDiemDuLich"],
    };
    const list = (await search.searchDiaDiemTour()).recordset;
    const fuse = new Fuse(list, options);
    return res.send(fuse.search(req.query.keyword));
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }
};

