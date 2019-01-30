var express = require('express');
var router = express.Router();
var signup = require('./signup');
var login = require('./login');
var profile = require('./profile')
var auth = require('../middleware/auth')

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

module.exports = router;