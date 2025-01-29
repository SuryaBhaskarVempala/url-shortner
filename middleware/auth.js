const {getUser} = require('../services/auth');
const User = require('../model/user');

async function restriction(req,res,next){
    const id=req.cookies?.uid;
    req.user=null;
    if(!id){
        return next();
    }
    user = await getUser(id);

    if(!user){
        req.user=null;
        return next();
    }

    console.log("User : "+user?.email+"  :  "+user?.password);
    userDetails = await User.findOne({email:user.email,password:user.password});
    if(userDetails){
        console.log("userDetails : "+userDetails);
        req.user = userDetails;
        
        JSON.stringify(req.user);
        console.log(req.user);
        console.log("in middleware : "+req.user.email);
        return next();
        
    }
    return next();
}

function checkAuth(roles=[]){
    return  function(req,res,next){
        if(req.user == null){
            console.log("is null in check Auth");
            return res.redirect(`/user/login?msg=You%20Need%20To%20Login%20!`);
        }
        if(roles.includes(req.user.role)){
            console.log("on Authorized in checkAuth");
            return res.render('error',{msg:"Your are UnAthurized To Acess !"});
        }
        console.log("passed in checkAuth"+req?.user);
        return next();
    }
}

module.exports={
    restriction,checkAuth
}