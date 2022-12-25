var express = require('express');
const {
  createNews,
  getAllNews,
  deleteSingleNews,
} = require('../controllers/newsController')

const {scrapNews, scrapSingleNews} =require('../controllers/scrapNewsController');

var router = express.Router();

/* GET home page. */
router.get('/', getAllNews);

//Scrap news
router.get('/scrap', scrapNews)

// GET single news
router.get('/:id', scrapSingleNews);

// GET news according to tag
router.get('/:tag', function(req, res, next) {
  res.json({ tag: req.tag });
});

//POST news
router.post('/create', createNews);

// DELETE news
router.delete('/:id/delete', deleteSingleNews);





module.exports = router;
