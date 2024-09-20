const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult} = require('express-validator')

const bcrypt = require('bcryptjs')
router.post("/createuser", 
  body('email', 'invalid email').isEmail(),
  body('password', 'Password must be of atleast 5 characters').isLength({min: 5})
  ,async(req, res)=> {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt)
  try {
    await User.create({
      name:req.body.name,
      email:req.body.email,
      location:req.body.location,
      password:securePassword
    })
    res.json({success:true})
  } catch (error) {
    console.log(error);
    res.json({success:false})
  }
})

module.exports = router;