import {check, validationResult} = from 'express-validator';

export const validatePassword = [
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];
