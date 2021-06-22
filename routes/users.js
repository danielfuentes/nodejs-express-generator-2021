const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/images/usuarios'))
    },
    filename: function (req, file, cb) {
      cb(null, 'foto' + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage })

const usersController = require('../controllers/usersController');
/* GET users listing. */
router.get('/create', usersController.create);
router.post('/store', upload.single('avatar'), usersController.store);
router.get('/login', usersController.login);
router.post('/ingresar', usersController.ingresar);
router.get('/logout', usersController.logout);

module.exports = router;
