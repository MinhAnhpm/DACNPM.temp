const db = require("../config/connectDB");
const pool = db.pool;
db.poolConnection;

module.exports = {
  searchDiaDiemTour: async () => {
    return new Promise((resolve, reject) => {
      pool
        .request()
        .query(
          "Select maDiaDiemDuLich, tenDiaDiemDuLich, hinhAnh From DiaDiemDuLich Where id_parent is null",
          (error, result) => {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          }
        );
    });
  },
};
