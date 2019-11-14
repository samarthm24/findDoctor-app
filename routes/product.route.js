const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


router.post('/user/signup',product_controller.user_signup);
router.post('/user/login',product_controller.user_login);
router.get('/search/getDoctorByID/:ID',product_controller.get_doc_by_id);
router.get('/search/getDoctorByArea/:Area',product_controller.get_doc_by_area);
router.get('/search/getDoctorByField/:Field',product_controller.get_doc_by_field);
router.post('/search/smartSearch',product_controller.add_smartsearch);

module.exports = router;

