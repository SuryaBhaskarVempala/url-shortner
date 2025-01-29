const express = require('express');
const { generateShortUrl, analytics } = require('../controller/url');

const router = express.Router();

router.post('/', generateShortUrl);
router.get('/analytics/:shortId', analytics);

module.exports = router;
