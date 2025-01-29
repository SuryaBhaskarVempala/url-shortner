const express = require('express');
const User = require('../model/user');
const {setUser,getUser} = require('../services/auth');
// const {v4 : uuidv4} = require('uuid');

async function createUser(req,res){
    const {name,email,password} = req.body;
    try{
        val = await User.handleDuplicateKeyError(email);
        await User.create({
            name:name,
            email:email,
            password:password
        });
        return res.render('login');
    }
    catch(exception){
        return res.render('signup',{msg:"User Already Exists !"});
    }
}

async function loginUser(req,res){
    const body = req.body;
    values = await User.findOne({email:body.email, password:body.password});
    if(!values){
        value="Please Give Valid Credentials"
        return res.redirect(`/user/login?msg=${value}`);
    }

   
    token = await setUser(values);
    console.log("jwt token : "+token);
    res.cookie('uid',token,{ maxAge: 1000 * 60 * 60 * 24 });
    return res.redirect('/');
}
module.exports={
    createUser,loginUser
}