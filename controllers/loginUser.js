const bcrypt = require('bcrypt');
const User = require('../models/user');



module.exports = (req,res) =>{
    //destructuring
    const {username,password} = req.body;
    //check when input username,password must match with username,password in database
    User.findOne({username: username}, (error,user) =>{
        if (user) {
            bcrypt.compare(password, user.password, (error,same)=>{
                if(same){
                    req.session.userId = user._id;
                    
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            })
            //when no data
        } else {
            res.redirect('/auth/login');
        }
    })
}
