const express = require('express');
const router = express.Router();
const Technology = require('../../models/Technology');

// @route   GET api/api
// @desc    Desc
// @acess   Public
router.get('/', async (req, res) => {
    try {
        res.json('kazkas');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// @route   GET api/main/Technologies/:count
// @desc    count is how many of the top technologies SORTED BY COUNT DESCENDING you want to get.
// @acess   Public

router.get('/Technologies/:count', (req, res) =>{
    Technology.find()
      .sort({count: "descending"})
      .then(maps => res.json(maps.slice(0,req.params.count)));
});


module.exports = router;
