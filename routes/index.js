const express = require('express');
const router = express.Router();
//Gets the home page
router.get('/', (req, res, next) => {
    res.redirect('/books');
});

module.exports = router;
