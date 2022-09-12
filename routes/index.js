var express = require("express");
var router = express.Router();
const User = require("./users");
const axios = require("axios");
const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {createUserWithEmailAndPassword}=require("firebase/auth");
// const {authentication} = require('../model/configure');
/* GET home page. */

var admin = require("firebase-admin");
const firebaseAdminKey = require("../model/key-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminKey),
});
router.get("/", function (req, res, next) {
  res.render("homePage");
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", async function (req, res, next) {
  const user = await admin
    .auth()
    .createUser({
      email: req.body.email,
      // password: req.body.password,
      emailVerified: false,
      disabled: false,
    })
    .then((userRecord) => {
      const user = new User({
        email: req.body.email,
      });
      user.save();

      res.status(201).json({
        message: "User created",
        user,
      });
    })
    .catch((err) => {
      res.status(401).json({ error: err });
    });
  const userEmail = req.body.email;
  // const userPassword = req.body.password;

//   const user = await admin
//     .auth()
//     .createUserWithEmailAndPassword(userEmail, userPassword)
//     .catch((error) => {
//       //error code
//       var errorCode = error.code;
// console.log(errorCode);
//       //error message
//       var errorMessage = error.message;
//     })
//     .then((result) => {
//       //redirect the user to profile page
//       console.log(result);
//       // window.location.assign("/profile");
//     });
});

// Mobile verification through OTP

router.post("/mobile", function (req, res, next) {
  const mobile = req.body.mobile;
  console.log(mobile);

  const appVerifier = req.recaptcha;
  admin
    .auth()
    .createUser({
      phoneNumber: mobile,
      appVerifier: appVerifier,
    })
    .then(function (userRecord) {
     
      const user = new User({
        mobile: req.body.mobile, 
      });
      user.save();
      res.status(201).json({
        message: "User created",
        userRecord,
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.get("/mobile", function (req, res, next) {
  res.render("mobile");
});

//sign In with Google
router.get("/google", function (req, res, next) {
  res.render("google");
});

// router.post('/signup',function(req,res,next){

//  const user = new User({
//         email: req.body.email,
//         password:req.body.password
//       });
//       console.log(user)
//       user.save();
//       res.status(201).json({
//         message: "User ban gaya hai bhaiya",
//         user,
//       });

// })
// router.get('/signup',function(req,res,next){
//   res.render('index');
// })

module.exports = router;
