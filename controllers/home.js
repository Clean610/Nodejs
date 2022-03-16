const BlogPost = require('../models/BlogPost.js')

module.exports = async (req,res)=>{
    const blogposts = await BlogPost.find({});
    //check
    // console.log(req.session);
    
    // console.log(localStorage)
    res.render('index',{
        blogposts
    })
}