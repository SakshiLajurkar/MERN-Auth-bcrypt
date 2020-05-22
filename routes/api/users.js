const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

router.post('/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter valid email id').isEmail(),
    check('password', 'Enter password more than 6 characters').isLength({min:6})
  ],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

const {name, email, password} = req.body;

try{
  let user = await User.findOne({email});

  if(user){
    return res.status(400).json({errors: [{message: 'User exists'}]})
  }

  user = new User({
    name,
    email,
    password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  res.send('User Registered');
} catch(err){
  console.error(err.message);
  res.status(500).send('Server error');
}
});

module.exports = router;
