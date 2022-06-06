const db = require("../config/connectDB");
const pool = db.pool;
db.poolConnection;

module.exports = {
    totalTour: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    `SELECT count(t.maTour) as 'totalTour', lt.tenLoaiTour
        FROM Tour t INNER JOIN LoaiTour lt ON t.maLoaiTour = lt.maLoaiTour 
        GROUP BY (lt.tenLoaiTour)`,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        });
    },
    totalBookTour: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    `SELECT count(pdt.maPhieuDatTour) as 'totalBookTour', lt.tenLoaiTour
          FROM PhieuDatTour pdt INNER JOIN ChiTietXuatPhat ctxp ON pdt.maPhieuDatTour = ctxp.maPhieuDatTour
          INNER JOIN Tour t ON ctxp.maTour = t.maTour
          INNER JOIN LoaiTour lt ON t.maLoaiTour = lt.maLoaiTour
          GROUP BY(lt.tenLoaiTour)`,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        });
    },
    totalIncome: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    `SELECT SUM(t.giaTour*pdt.soNguoiLon + t.giaTour*pdt.soTreEm*0.6 + sp.giaSanPham*ctsp.soLuong) as 'totalIncome' 
          FROM PhieuDatTour pdt FULL OUTER JOIN ChiTietSanPham ctsp ON pdt.maPhieuDatTour = ctsp.maPhieuDatTour
          FULL OUTER JOIN SanPham sp ON ctsp.maSanPham =  sp.maSanPham
          FULL OUTER JOIN ChiTietXuatPhat ctxp  ON pdt.maPhieuDatTour = ctxp.maPhieuDatTour
          FULL OUTER JOIN Tour t ON ctxp.maTour = t.maTour`,
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },
    totalCustomer: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    "select count(kh.maKhach) as 'totalCustomer' from KhachHang kh",
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        });
    },
    totalProduct: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    `select count(sp.tenSanPham) as 'totalProduct', lsp.tenLoaiSanPham
        from SanPham sp INNER JOIN LoaiSanPham lsp ON sp.maLoaiSanPham = lsp.maLoaiSanPham 
        group by (lsp.tenLoaiSanPham)`,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        });
    },
    getTotalByYearMonth: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    `SELECT  year(pdt.ngayDangKyPhieuDatTour) as year, month(pdt.ngayDangKyPhieuDatTour) as month, 
          SUM(sp.giaSanPham*ctsp.soLuong) as 'totalProduct',
          SUM(t.giaTour*pdt.soNguoiLon + t.giaTour*pdt.soTreEm*0.6) as 'totalTour'
          FROM PhieuDatTour pdt LEFT OUTER JOIN KhachHang  kh ON pdt.maKhach = kh.maKhach
          FULL OUTER JOIN ChiTietSanPham ctsp ON pdt.maPhieuDatTour = ctsp.maPhieuDatTour
          FULL OUTER JOIN SanPham sp ON ctsp.maSanPham =  sp.maSanPham
          FULL OUTER JOIN ChiTietXuatPhat ctxp  ON pdt.maPhieuDatTour = ctxp.maPhieuDatTour
          FULL OUTER JOIN Tour t ON ctxp.maTour = t.maTour
          GROUP BY year(pdt.ngayDangKyPhieuDatTour), month(pdt.ngayDangKyPhieuDatTour)
          ORDER BY year(pdt.ngayDangKyPhieuDatTour), month(pdt.ngayDangKyPhieuDatTour) asc`,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        });
    },
    totalByMonth: async(Year) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("year(ngayDangKyPhieuDatTour)", db.sql.Date, Year)
                .query(
                    `SELECT  month(pdt.ngayDangKyPhieuDatTour) as month, SUM(sp.giaSanPham*ctsp.soLuong) as 'totalProduct',
          SUM(sp.giaSanPham*ctsp.soLuong) as 'totalProduct', SUM(t.giaTour*pdt.soNguoiLon + t.giaTour*pdt.soTreEm*0.6) as 'totalTour'
          FROM PhieuDatTour pdt LEFT OUTER JOIN KhachHang  kh ON pdt.maKhach = kh.maKhach
          FULL OUTER JOIN ChiTietSanPham ctsp ON pdt.maPhieuDatTour = ctsp.maPhieuDatTour
          FULL OUTER JOIN SanPham sp ON ctsp.maSanPham =  sp.maSanPham
          FULL OUTER JOIN ChiTietXuatPhat ctxp  ON pdt.maPhieuDatTour = ctxp.maPhieuDatTour
          FULL OUTER JOIN Tour t ON ctxp.maTour = t.maTour
          WHERE year(pdt.ngayDangKyPhieuDatTour) = @year(ngayDangKyPhieuDatTour)
          GROUP BY month(pdt.ngayDangKyPhieuDatTour)
          ORDER BY month(pdt.ngayDangKyPhieuDatTour) asc`,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        });
    },
    bestSellingProduct: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    `select sp.maSanPham, sp.tenSanPham, sp.giaSanPham, sp.maLoaiSanPham , lsp.tenLoaiSanPham
          from PhieuDatTour pdt INNER JOIN ChiTietSanPham ctsp on pdt.maPhieuDatTour = ctsp.maPhieuDatTour
          INNER JOIN SanPham sp on ctsp.maSanPham = sp.maSanPham
          INNER JOIN LoaiSanPham lsp on sp.maLoaiSanPham = lsp.maLoaiSanPham`,
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        })
    },
    bestSellingTour: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    `select t.maTour, t.gioiThieuTour, t.hinhAnh, SUM(pdt.soNguoiLon + pdt.soTreEm) as soLuongNguoi, 
          t.giaTour, t.maLoaiTour, lt.tenLoaiTour
          from PhieuDatTour pdt INNER JOIN ChiTietXuatPhat ctxp ON pdt.maPhieuDatTour = ctxp.maPhieuDatTour
          INNER JOIN Tour T ON ctxp.maTour = t.maTour
          INNER JOIN LoaiTour lt ON t.maLoaiTour = lt.maLoaiTour	
          GROUP BY t.maTour, t.gioiThieuTour, t.hinhAnh,t.giaTour, t.maLoaiTour, lt.tenLoaiTour`,
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },
};