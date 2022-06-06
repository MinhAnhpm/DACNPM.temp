const { addProduct, updateProduct } = require("../models/managerProduct.models");
const Product = require("../models/managerProduct.models");


module.exports.createProduct = async(req, res) => {
    try {
        let addpro = req.body;
        addProduct(addpro)
            .then((result) => {
                res.send({
                    message: "successfully",
                });
            })
    } catch (error) {
        return res.status(400).send({
            message: error,
        });
    };
};

// module.exports.createProduct = async(req, res) => {
//     try {
//         let addpro = req.body;
//         if (!req.body.tenLoaiSanPham) {
//             return res.status(400).send({
//                 message: "please enter name tenLoaiSanPham because loaiSanPham is new",
//             });
//         } else {
//             addProduct(addpro)
//                 .then((result) => {
//                     res.send({
//                         message: "successfully",
//                     });
//                 })
//         }
//     } catch (error) {
//         return res.status(400).send({
//             message: error,
//         });
//     };
// };


module.exports.getProductById = async(req, res) => {

    let idProduct = req.params.idProduct;
    console.log(idProduct)
    await Product
        .getProductById(idProduct)
        .then((result) => res.send(result.recordsets[0][0]))
        .catch((error) => res.status(401).send({ message: error }));
}
module.exports.getAllListProduct = async(req, res) => {
    await Product
        .getAllListProduct()
        .then((result) => res.send(result.recordsets[0]))
        .catch((error) => res.status(401).send({ message: error }));
};

module.exports.putProduct = async(req, res) => {
    try {
        const updatepro = req.body;
        updateProduct(updatepro)
            .then((result) => {
                res.send({
                    message: "successfully",
                });
            })
    } catch (error) {
        return res.status(400).send({
            message: error,
        });
    };
};