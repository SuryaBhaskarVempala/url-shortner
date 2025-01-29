const shortid = require('shortid');
const URL = require('../model/url');

async function generateShortUrl(req, res) {
    const body = req.body;

    if(body.url){
        console.log(body.url)
        console.log("in url controller : "+req.user._id);
        const shortID = shortid();

        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: [],
            createdBy: req.user._id
        });

        const results = await URL.find({});

        if (!res.headersSent) {
            return res.redirect(`/?id=${shortID}`);
        } else {
            console.warn('Headers already sent.');
            return res.redirect('/');
        }
    }
    else{
        console.log("URL REQUIRED >> !");
        return res.redirect('/');
    }
}

async function analytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!res.headersSent) {
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } else {
        console.warn('Headers already sent.');
    }
}

module.exports = {
    generateShortUrl,
    analytics
};
