const { Router } = require('express');
const { description } = require('../queries/CategoryQueries');
const router = Router();
const categorySchema = require('../schemas/categorySchema')


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/products', 
    (req, res) => {
        return res.render('product');
    }
);

module.exports = router;