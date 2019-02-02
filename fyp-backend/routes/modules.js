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
router.get('/get/item', auth, getItem)
router.put('/update/item', auth, updateItem)

module.exports = router;