const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter valid email id').isEmail(),
    check('password', 'Enter password more than 6 characters').isLength({min:6})
  ],
(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  res.send('User Route')
});

module.exports = router;
