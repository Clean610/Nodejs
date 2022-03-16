const BlogPost = require('../models/BlogPost');
module.exports = async (req,res)=>{
    const blogposts = await BlogPost.findById(req.params.id);
    res.render('post',{
        blogposts
    })
}