const db = require("../config/connectDB");
const pool = db.pool;
db.poolConnection;

module.exports = {
    getTourById: async(idTour) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("idTour", db.sql.Int, idTour)
                .query(
                    "select * from Tour where maTour = @idTour",
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },

    getAllListTour: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    "select * from Tour",
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },
    addTour: async(addtour) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("maLoaiTour", db.sql.Int, addtour.maLoaiTour)
                .input("tenTour", db.sql.NVarChar, addtour.tenTour)
                .input("giaTour", db.sql.Money, addtour.giaTour)
                .input("hinhAnh", db.sql.NVarChar, addtour.hinhAnh)
                .input("soNguoi", db.sql.Int, addtour.soNguoi)
                .input("gioiThieuTour", db.sql.NVarChar, addtour.gioiThieuTour)
                .query(
                    `SET IDENTITY_INSERT LoaiTour ON
          if not exists (select * from LoaiTour where maLoaiTour = @maLoaiTour)
          begin
            insert into LoaiTour(maLoaiTour) values (@maLoaiTour);
            insert into Tour(tenTour, giaTour, hinhAnh, soNguoi, gioiThieuTour, maLoaiTour) 
                      values(@tenTour, @giaTour, @hinhAnh, @soNguoi, @gioiThieuTour, @maLoaiTour);
          end;
        else insert into Tour(tenTour, giaTour, hinhAnh, soNguoi, gioiThieuTour, maLoaiTour) 
            values(@tenTour, @giaTour, @hinhAnh, @soNguoi, @gioiThieuTour, @maLoaiTour);`,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        })
    },

    getTourByAll: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    `SELECT pdt.maPhieuDatTour, kh.hoTenKhach, t.tenTour, SUM(pdt.soNguoiLon + pdt.soTreEm) as 'soLuongNguoi', 
              pdt.ngayDangKyPhieuDatTour, ttxp.ngayXuatPhat, ttxp.tenDiaDiemXuatPhat, 
              SUM(t.giaTour*pdt.soNguoiLon + t.giaTour*pdt.soTreEm*0.6) as 'TongTien'
              FROM PhieuDatTour pdt LEFT OUTER JOIN KhachHang  kh ON pdt.maKhach = kh.maKhach
              FULL OUTER JOIN ChiTietSanPham ctsp ON pdt.maPhieuDatTour = ctsp.maPhieuDatTour
              FULL OUTER JOIN SanPham sp ON ctsp.maSanPham =  sp.maSanPham
              FULL OUTER JOIN ChiTietXuatPhat ctxp  ON pdt.maPhieuDatTour = ctxp.maPhieuDatTour
              FULL OUTER JOIN Tour t ON ctxp.maTour = t.maTour
              INNER JOIN ThongTinXuatPhat ttxp ON ctxp.maTTXuatPhat = ttxp.maTTXuatPhat
              GROUP BY pdt.maPhieuDatTour, kh.hoTenKhach, t.tenTour, pdt.ngayDangKyPhieuDatTour, ttxp.ngayXuatPhat,ttxp.tenDiaDiemXuatPhat`,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        })
    },


    updateTour: async(updatetour) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("maTour", db.sql.Int, updatetour.maTour)
                .input("maLoaiTour", db.sql.Int, updatetour.maLoaiTour)
                .input("tenTour", db.sql.NVarChar, updatetour.tenTour)
                .input("giaTour", db.sql.Money, updatetour.giaTour)
                .input("hinhAnh", db.sql.NVarChar, updatetour.hinhAnh)
                .input("soNguoi", db.sql.Int, updatetour.soNguoi)
                .input("gioiThieuTour", db.sql.NVarChar, updatetour.gioiThieuTour)
                .query(
                    `SET IDENTITY_INSERT LoaiTour ON
          if not exists (select * from LoaiTour where maLoaiTour = @maLoaiTour)
            begin
              insert into LoaiTour(maLoaiTour) values (@maLoaiTour);
              update Tour SET tenTour = @tenTour, giaTour = @giaTour, hinhAnh = @hinhAnh, soNguoi = @soNguoi, 
                              gioiThieuTour = @gioiThieuTour , maLoaiTour = @maLoaiTour where maTour = @maTour;
            end;
          else update Tour SET tenTour = @tenTour, giaTour = @giaTour, hinhAnh = @hinhAnh, soNguoi = @soNguoi, 
                              gioiThieuTour = @gioiThieuTour , maLoaiTour = @maLoaiTour where maTour = @maTour;`,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        })
    },
};