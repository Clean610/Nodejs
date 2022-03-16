const User = require('../models/user');
const path = require('path');



module.exports = (req,res) => {
    User.create(req.body, (error,user) =>{
        if(error){
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })


}
