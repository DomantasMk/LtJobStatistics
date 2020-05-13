const express = require('express');
const router = express.Router();
const Technology = require('../../models/Technology');
const Main = require('../../models/Main');
const { keywords } = require('../../scrapers/ScrapperData');

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

router.get('/Technologies/:count', (req, res) => {
    Main.find()
        .sort({ count: 'descending' })
        .then((maps) => res.json(maps.slice(0, req.params.count)));
});

// @route   GET api/main/Technologies/salary/:amount
// @desc    amount is the salary value for each technlogy
// @acess   Public

router.get('/Technologies/salary/:count', (req, res) => {
    Technology.find()
        .sort({ average_salary: 'descending' })
        .then((maps) => res.json(maps.slice(0, req.params.count)));
});

// @route   GET api/main/Technologies/website?array=[]
// @desc    Get all technologies by website name
// @acess   Public
router.get('/Technologies/data/website', async (req, res) => {
    var websites = JSON.parse(req.query.array);
    try {
        Promise.all(
            websites.map((website) =>
                Technology.find({ website })
                    .select('-_id -__v -date_added_to_db')
                    .then()
            )
        ).then((result) => {
            res.json(result);
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// @route   GET api/main/keywords
// @desc    Get all keywords
// @acess   Public
router.get('/keywords', async (req, res) => {
    try {
        let parsedKeywords = keywords.map((e) => {
            return e[0];
        });
        res.json(parsedKeywords);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
