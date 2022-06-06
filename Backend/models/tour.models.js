const db = require("../config/connectDB");
const pool = db.pool;
db.poolConnection;

module.exports = {
  getListTour: async (idTypeTour) => {
    return new Promise((resolve, reject) => {
      pool
        .request()
        .input("idTypeTour", db.sql.Int, idTypeTour)
        .query(
          "select t.maTour, t.tenTour, COUNT(t.maTour) as soNgay, t.soNguoi, t.giaTour, t.hinhAnh, t.gioiThieuTour, t.maLoaiTour from Tour t where t.maLoaiTour = @idTypeTour group by t.maTour, t.tenTour, t.giaTour, t.hinhAnh, t.gioiThieuTour, t.maLoaiTour, t.soNguoi",
          (error, result) => {
            return error ? reject(error) : resolve(result);
          }
        );
    });
  },

  getAllListTour: async () => {
    return new Promise((resolve, reject) => {
      pool
        .request()
        .query(
          "select t.maTour, t.tenTour, COUNT(t.maTour) as soNgay, t.soNguoi, t.giaTour, t.hinhAnh, t.gioiThieuTour, t.maLoaiTour from Tour t join  ChiTietDiaDiem ct  on ct.maTour = t.maTour group by t.maTour, t.tenTour, t.giaTour, t.hinhAnh, t.gioiThieuTour, t.maLoaiTour, t.soNguoi",
          (error, result) => {
            return error ? reject(error) : resolve(result);
          }
        );
    });
  },

  getNumberPeople: async (id) => {
    return new Promise((resolve, reject) => {
      pool
        .request()
        .input("id", db.sql.Int, id)
        .query(
          `select ISNULL(SUM(soNguoiLon + soTreEm), 0 ) as soNguoi 
          from PhieuDatTour pdt left join HopDong hd
          on pdt.maPhieuDatTour = hd.maPhieuDatTour where maChiTiet = @id`,
          (error, result) => {
            return error ? reject(error) : resolve(result);
          }
        );
    });
  },

  getContentTour: async (idTour) => {
    return new Promise((resolve, reject) => {
      pool
        .request()
        .input("maTour", db.sql.Int, idTour)
        .query(
          "select t.* from Tour t join ChiTietXuatPhat ctxp on t.maTour = ctxp.maTour where ctxp.trangThai = 1 and t.maTour = @maTour",
          (error, result) => {
            return error ? reject(error) : resolve(result);
          }
        );
    });
  },

  getThongTinXuatPhat: async (maTour) => {
    return new Promise((resolve, reject) => {
      pool
        .request()
        .input("maTour", db.sql.Int, maTour)
        .query(
          `select ttxp.maTTXuatPhat, ngayXuatPhat, tenDiaDiemXuatPhat, maChiTiet 
          from ThongTinXuatPhat ttxp join ChiTietXuatPhat ctxp 
          on ttxp.maTTXuatPhat = ctxp.maTTXuatPhat 
          where ctxp.trangThai != -1 and ttxp.maTTXuatPhat in (select maTTXuatPhat from ChiTietXuatPhat where maTour = @maTour)
          group by ttxp.maTTXuatPhat, ngayXuatPhat, tenDiaDiemXuatPhat, maChiTiet
          having ngayXuatPhat > GETDATE()
          ORDER BY ngayXuatPhat asc`,
          (error, result) => {
            return error ? reject(error) : resolve(result);
          }
        );
    });
  },
};
