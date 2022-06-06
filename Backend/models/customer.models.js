const db = require("../config/connectDB");
const pool = db.pool;
db.poolConnection;

module.exports = {
    addInfoCustomer: async(account) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("maKhach", db.sql.Int, account.maKhach)
                .input("hoTenKhach", db.sql.NVarChar, account.hoTenKhach)
                .input("soDienThoai", db.sql.VarChar, account.soDienThoai)
                .input("eMail", db.sql.VarChar, account.eMail)
                .input("diaChi", db.sql.NVarChar, account.diaChi)
                .query(
                    "UPDATE KhachHang SET hoTenKhach = @hoTenKhach, soDienThoai = @soDienThoai, eMail = @eMail, diaChi = @diaChi WHERE maKhach = @maKhach",
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },


    getCustomerById: async(idCustomer) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("maKhach", db.sql.Int, idCustomer)
                .query(
                    "select hoTenKhach, soDienThoai, diaChi, eMail from KhachHang where maKhach = @maKhach",
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },
    getAllListCustomer: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    "select * from KhachHang",
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },

    updateCustomer: (update) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("maKhach", db.sql.Int, update.maKhach)
                .input("eMail", db.sql.VarChar, update.eMail)
                .input("soDienThoai", db.sql.VarChar, update.soDienThoai)
                .input("hoTenKhach", db.sql.NVarChar, update.hoTenKhach)
                .input("diaChi", db.sql.NVarChar, update.diaChi)
                .input("deleted", db.sql.Bit, update.deleted)
                .input("passWord", db.sql.VarChar, update.passWord)
                .input("imager", db.sql.NVarChar, update.imager)
                .query(
                    `update KhachHang
          set eMail = @eMail, soDienThoai = @soDienThoai, hoTenKhach = @hoTenKhach, diaChi = @diaChi, 
          deleted = @deleted, passWord = @passWord, imager = @imager
          where maKhach = @maKhach`,
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },

    // getCustomer: async (id) => {
    //   return new Promise((resolve, reject) => {
    //     pool
    //       .request()
    //       .input("maKhach", db.sql.Int, id)
    //       .query(
    //         "select * from KhachHang where maKhach = @maKhach",
    //         (error, result) => {
    //           return error ? reject(error) : resolve(result);
    //         }
    //       );
    //   });
    // },
};