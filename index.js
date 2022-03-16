const express = require('express');
const app =express();
const mongoose = require('mongoose');
const expressSession = require('express-session')
const ejs = require('ejs')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});
const fileUpload = require('express-fileupload');

//controller
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storeController = require('./controllers/storePost_Sendemail');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout');

//middleware
const authMiddleware = require('./middleware/authMiddleware');
const redirectMiddleware = require('./middleware/redirectAuthen');
app.use(expressSession({
    secret:'blogSecret'
}))
//show some navbar when login
global.loggedIn = null;

app.use("*", (req,res,next) =>{
    loggedIn = req.session.userId; 
    next();
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload());

app.get("/", homeController);

//user register
app.get("/auth/register",redirectMiddleware ,newUserController);

app.get("/post/:id", getPostController);

//login user
app.get('/auth/login', redirectMiddleware ,loginController);

//logout
app.get('/auth/logout', logoutController);

//New Post
app.get('/posts/new',authMiddleware ,newPostController);

//create Data
app.post('/posts/store/', authMiddleware ,storeController);



//create User

app.post('/users/register', redirectMiddleware ,storeUserController);

//login user check
app.post('/users/login',redirectMiddleware ,loginUserController)



app.listen(5000 , () => {
    console.log('App listen on port 5000');
})
