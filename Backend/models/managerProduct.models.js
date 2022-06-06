const db = require("../config/connectDB");
const pool = db.pool;
db.poolConnection;

module.exports = {
    addProduct: async(addpro) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("tenSanPham", db.sql.NVarChar, addpro.tenSanPham)
                .input("soLuongHienTai", db.sql.Int, addpro.soLuongHienTai)
                .input("giaSanPham", db.sql.Money, addpro.giaSanPham)
                .input("hinhAnh", db.sql.NVarChar, addpro.hinhAnh)
                .query(
                    "insert into SanPham(tenSanPham, soLuongHienTai, giaSanPham, hinhAnh) values (@tenSanPham,@soLuongHienTai, @giaSanPham, @hinhAnh)",
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        });
    },

    // addProduct: async (addpro) => {
    //     return new Promise((resolve, reject) => {
    //       pool
    //         .request()
    //         .input("maLoaiSanPham", db.sql.Int, addpro.maLoaiSanPham)
    //         .input("tenLoaiSanPham", db.sql.NVarChar, addpro.tenLoaiSanPham)
    //         .input("tenSanPham", db.sql.NVarChar, addpro.tenSanPham)
    //         .input("soLuongHienTai", db.sql.Int, addpro.soLuongHienTai)
    //         .input("giaSanPham", db.sql.Money, addpro.giaSanPham)
    //         .input("trangThai", db.sql.Int, addpro.trangThai)
    //         .input("hinhAnh", db.sql.NVarChar, addpro.hinhAnh)
    //         .query(
    //         `SET IDENTITY_INSERT LoaiSanPham ON
    //         if not exists (select * from LoaiSanPham where maLoaiSanPham = @maLoaiSanPham)
    //           begin
    //             insert into LoaiSanPham(maLoaiSanPham, tenLoaiSanPham) values (@maLoaiSanPham, @tenLoaiSanPham);
    //             insert into SanPham(tenSanPham, soLuongHienTai, giaSanPham, maLoaiSanPham, trangThai, hinhAnh) 
    //             values(@tenSanPham, @soLuongHienTai, @giaSanPham, @maLoaiSanPham, @trangThai, @hinhAnh);
    //           end;
    //         else insert into SanPham(tenSanPham, soLuongHienTai, giaSanPham, maLoaiSanPham, trangThai, hinhAnh) 
    //           values(@tenSanPham, @soLuongHienTai, @giaSanPham, @maLoaiSanPham, @trangThai, @hinhAnh);`,
    //           (error, result) => {
    //             if (error) {
    //               return reject(error);
    //             }
    //             return resolve(result);
    //           }
    //         );
    //     });
    //   },

    getProductById: async(idProduct) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("idProduct", db.sql.Int, idProduct)
                .query(
                    "select * from SanPham where maSanPham = @idProduct",
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },

    getAllListProduct: async() => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .query(
                    "select * from SanPham sp group by sp.maSanPham, sp.tenSanPham, sp.giaSanPham, sp.soLuongHienTai, sp.hinhAnh",
                    (error, result) => {
                        return error ? reject(error) : resolve(result);
                    }
                );
        });
    },
    updateProduct: async(updatepro) => {
        return new Promise((resolve, reject) => {
            pool
                .request()
                .input("maSanPham", db.sql.Int, updatepro.maSanPham)
                .input("tenSanPham", db.sql.NVarChar, updatepro.tenSanPham)
                .input("soLuongHienTai", db.sql.Int, updatepro.soLuongHienTai)
                .input("giaSanPham", db.sql.Money, updatepro.giaSanPham)
                .input("hinhAnh", db.sql.NVarChar, updatepro.hinhAnh)
                .query(
                    `update SanPham SET tenSanPham = @tenSanPham, soLuongHienTai = @soLuongHienTai, giaSanPham = @giaSanPham, hinhAnh = @hinhAnh where maSanPham = @maSanPham`,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
        });
    },
    // updateProduct: async(updatepro) => {
    //     return new Promise((resolve, reject) => {
    //         pool
    //             .request()
    //             .input("maLoaiSanPham", db.sql.Int, updatepro.maLoaiSanPham)
    //             .input("tenLoaiSanPham", db.sql.NVarChar, updatepro.tenLoaiSanPham)
    //             .input("maSanPham", db.sql.Int, updatepro.maSanPham)
    //             .input("tenSanPham", db.sql.NVarChar, updatepro.tenSanPham)
    //             .input("soLuongHienTai", db.sql.Int, updatepro.soLuongHienTai)
    //             .input("giaSanPham", db.sql.Money, updatepro.giaSanPham)
    //             .input("trangThai", db.sql.Int, updatepro.trangThai)
    //             .input("hinhAnh", db.sql.NVarChar, updatepro.hinhAnh)
    //             .query(
    //                 `SET IDENTITY_INSERT LoaiSanPham ON
    //           if not exists (select * from LoaiSanPham where maLoaiSanPham = @maLoaiSanPham)
    //             begin 
    //               insert into LoaiSanPham(maLoaiSanPham, tenLoaiSanPham) values (@maLoaiSanPham, @tenLoaiSanPham);  
    //               update SanPham SET tenSanPham = @tenSanPham, soLuongHienTai = @soLuongHienTai, 
    //                                 giaSanPham = @giaSanPham, maLoaiSanPham = @maLoaiSanPham,
    //                                 trangThai = @trangThai, hinhAnh = @hinhAnh where maSanPham = @maSanPham;
    //             end;
    //           else update SanPham SET tenSanPham = @tenSanPham, soLuongHienTai = @soLuongHienTai, 
    //                                   giaSanPham = @giaSanPham, maLoaiSanPham = @maLoaiSanPham,
    //                                   trangThai = @trangThai, hinhAnh = @hinhAnh where maSanPham = @maSanPham;
    //               `,

    //                 (error, result) => {
    //                     if (error) {
    //                         return reject(error);
    //                     }
    //                     return resolve(result);
    //                 }
    //             );
    //     });
    // },
};