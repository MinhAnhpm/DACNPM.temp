const db = require("../config/connectDB");
const pool = db.pool;
db.poolConnection;

module.exports = {
    resgisterAccuont: async(account) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                // .input("userName", db.sql.VarChar, account.userName)
                .input("passWord", db.sql.VarChar, account.passWord)
                .input("eMail", db.sql.VarChar, account.eMail)
                .input("soDienThoai", db.sql.VarChar, account.soDienThoai)
                .input("hoTenKhach", db.sql.NVarChar, account.hoTenKhach)

            .query(
                "INSERT INTO KhachHang(hoTenKhach, soDienThoai, eMail,  passWord) VALUES (@hoTenKhach, @soDienThoai, @eMail,  @passWord)",
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                }
            );
        });
    },

    getAccount: async(userName) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("userName", db.sql.VarChar, userName)
                .query(
                    "select * from KhachHang where userName=@userName",
                    (error, result) => {
                        if (error) return reject(error);
                        return resolve(result);
                    }
                );
        });
    },
};