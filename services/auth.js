const jwt = require('jsonwebtoken');

const secretKey = "chintu@123###";

async function setUser(user){
    if (!user.email || !user.password) { throw new Error('User object must contain email and password'); }
    console.log(user.email,user.password);
    emailString = String(user.email);
    passwordString = String(user.password);
    const payload = { 
        "email":emailString,
        "password":passwordString
    }; 
    const token = await jwt.sign(payload, secretKey);
    console.log("created Token : "+token);
    return await token;  // No need to check if token, since jwt.sign always returns a token
}

async function getUser(token){
    if (!token) { 
        console.log("Token Not Present!"); 
        return { message: 'No token provided' }; 
    }
    return await jwt.verify(token, secretKey);
}

module.exports = {
    setUser,
    getUser
};
