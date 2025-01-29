const express = require('express');
const URL = require('../model/url');
const { checkAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', checkAuth(['USER','ADMIN']),async function(req,res){

        console.log("user in - static Routes : "+req.user.email);
        console.log("user in - static Routes : "+req.user._id);

        const result = await URL.find({createdBy : req.user._id});
        console.log(result);

        console.log("Query ID:", req.query?.id); // Log the query ID

        if (!res.headersSent) {
            if (req.query?.id) {
                console.log("Query ID inside header not sent block:", req.query?.id);
                return res.render('home', { id: req.query.id, urls: result });
            }
            return res.render('home', { urls: result });
        }

        if (req.query?.id) {
            console.log("Query ID inside header sent block:", req.query.id);
            return res.render('home', { id: req.query.id, urls: result });
        } else {
            console.log("header also sent");
            return res.render('home', { urls: result });
        }
});

router.get('/admin/urls',checkAuth(['ADMIN']),async (req,res)=>{

        console.log("Admin in - static Routes : "+req.user?.email)
        const result = await URL.find();
        console.log(result);

       

        if (!res.headersSent) {
            return res.render('home', { urls: result , adminMsg : "Welcome To Admin Panel"});
        }

       
            console.log("header also sent");
            return res.render('home', { urls: result , adminMsg : "Welcome To Admin Panel"});
});

router.get("/signup",(req,res)=>{
    res.render('signup');
})
module.exports = router;
