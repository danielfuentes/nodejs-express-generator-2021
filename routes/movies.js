const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();

router.get('/', moviesController.index);
router.get('/buscar', moviesController.search);
router.get('/create', moviesController.create);
router.post('/store',moviesController.store);
router.get('/detail/:id', moviesController.detail);
router.get('/edit/:id', moviesController.edit);
router.post('/update/:id', moviesController.update);
router.get('/delete/:id', moviesController.delete);
router.post('/delete/:id', moviesController.destroy);


module.exports = router;