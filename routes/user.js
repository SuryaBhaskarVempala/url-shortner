const express = require('express');

const {createUser,loginUser} = require('../controller/user');

const router = express.Router();

router.post('/',createUser);

router.get('/login',(req,res)=>{
    const message = req.query?.msg; 
    if(message){
        console.log(message.slice(1,message.length-1));
        newValue = message.slice(0,message.length-1);
        return res.render('login', { msg:newValue});
    }
    return res.render('login');
});

router.get("/signup",(req,res)=>{
    res.render('signup');
})

router.post('/loginForm',loginUser)

module.exports = router;
