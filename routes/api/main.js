const express = require('express');
const router = express.Router();

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

module.exports = router;
