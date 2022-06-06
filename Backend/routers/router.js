const express = require("express");
const router = express();

const login = require("../controllers/login.controllers");
const search = require("../controllers/search.controllers");
const tour = require("../controllers/tour.controllers");
// const bookTour = require("../controllers/bookingTour.controllers");
// const mail = require("../middleware/send_mail.js");
const product = require("../controllers/managerProduct.controllers");
const managertour = require("../controllers/managerTour.controllers");
const customer = require("../controllers/customer.controllers");

router.post("/createAccount", login.createAccount);
router.post("/login", login.login);

router.get("/search", search.searchDiaDiemTour);
router.get("/getListTour", tour.getListTour);
router.get("/getAllListTour", tour.getAllListTour);
router.get("/getContentTour", tour.getContentTour);
router.get("/getThongTinXuatPhat", tour.getThongTinXuatPhat);


//router.post("/bookingTour", bookTour.bookingTour);

router.post("/addProduct", product.createProduct);
router.get("/getAllListProduct", product.getAllListProduct);
router.put("/putProduct", product.putProduct);
router.get("/getProductById/:idProduct", product.getProductById);

router.get("/getTourById/:idTour", managertour.getTourById);
router.get("/getAllListTour", managertour.getAllListTour);
router.post("/addTour", managertour.createTour);
router.put("/putTour", managertour.putTour);
router.get("/getTourByAll", managertour.getTourByAll);

router.get("/getAllListCustomer", customer.getAllListCustomer);
router.get("/getCustomerById/:idCustomer", customer.getCustomerById);
router.put("/addInfoCustomer", customer.createInfoCustomer);
router.put("/putCustomer", customer.putCustomer);

// router.get("/totalTour", statistical.totalTour);
// router.get("/totalBookTour", statistical.totalBookTour);
// router.get("/totalIncome", statistical.totalIncome);
// router.get("/totalCustomer", statistical.totalCustomer);
// router.get("/totalProduct", statistical.totalProduct);
// router.get("/getTotalByYearMonth", statistical.getTotalByYearMonth);
// router.get("/totalByMonth/:Year", statistical.totalByMonth);
// router.get("/bestSellingTour", statistical.bestSellingTour);
// router.get("/bestSellingProduct", statistical.bestSellingProduct);
// router.get("/totalProduct", statistical.totalProduct);


module.exports = router;