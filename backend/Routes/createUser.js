const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
router.post("/createuser", 
  // body('email', 'invalid email').isEmail(),
  check('password', 'Password must be of atleast 5 characters').isLength({min: 5})
  ,async(req, res)=> {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
  try {
    await User.create({
      name:req.body.name,
      email:req.body.email,
      location:req.body.location,
      password:req.body.password
    })
    res.json({success:true})
  } catch (error) {
    console.log(error);
    res.json({success:false})
  }
})
module.exports = router;