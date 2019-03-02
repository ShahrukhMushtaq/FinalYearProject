var express = require('express');
var router = express.Router();
var signup = require('./signup');
var login = require('./login');
var profile = require('./profile')
var updateProfile = require('./update-profile')
var auth = require('../middleware/auth')
var addItem = require('./items/add-item')
var getItem = require('./items/get-item')
var updateItem = require('./items/update-item')
var createAuction = require('./auction/create-auction')
var getAuction = require('./auction/get-auction')
var getAllAuction = require('./auction/get-auction-all')
var bid = require('./bids/bid')
var getBid = require('./bids/get-bid')

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20
  }
});

router.post('/register', signup);
router.post('/login', login)
router.get('/my/profile', auth, profile)
router.put('/my/update-profile/:id', auth, updateProfile)

router.post('/add/item', auth, addItem)
router.get('/get/item/:id', auth, getItem)
router.put('/update/item/:id', auth, updateItem)

router.post('/create/auction', auth, createAuction)
router.get('/get/auction/:id', auth, getAuction)
router.get('/get/auction', getAllAuction)

router.post('/create/bid', bid)
router.get('/get/bid/:auctionID', getBid)

module.exports = router;