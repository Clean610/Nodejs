const User = require('../models/user');
const path = require('path');
var nodemailer = require('nodemailer');

//store and send email

module.exports = (req,res) => {
    //check user id 
    const id = req.session.userId;
    //update value in database to true when press approve button
       User.findByIdAndUpdate(id,{
           approve:true}, (error,user)=>{
               console.log(error)
           })
       
       
        User.find({approve:true}, (error,user) =>{
           console.log('user check==>',user)
           console.log('User count=>',user.length)
            if(user.length==3){
               
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'momner965@gmail.com',
            pass: 'required pass'
    }
  });
  
        var mailOptions = {
            from: 'momner965@gmail.com',
            to: '61010743@kmitl.ac.th',
            subject: 'Sending Email using Node.js',
            text: 'Hi!!, have 3 users approved^^'
    };
  
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
           }else{
            console.log("You must approve 3 user")
            res.redirect('/')
           }
        
       })
       
   }

