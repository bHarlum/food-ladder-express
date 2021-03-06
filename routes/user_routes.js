const express = require('express');
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const passport = require("passport");

const upload = require("./../services/resource_bucket/upload_manager");
const UserController = require('../controllers/user_controller.js');

//TODO: Need to write authorization middleware to check if user is admin for user index route.
router.get('/', 
  passport.authenticate("jwt", { session: false }),
  UserController.index
);

router.get('/:id', passport.authenticate("jwt", { session: false }), UserController.show);
router.get('/find/:userEmail', UserController.find);

router.post('/register', celebrate({
  body: {
    firstName: Joi.string().required(), 
    lastName: Joi.string().required(), 
    phone: Joi.string().regex(/[0-9\+\-]/).error(new Error("That is not a valid phone number.")),
    email: Joi.string().email({ minDomainSegments: 2 }).required(), 
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(), 
    projectId: Joi.string().required(), 
  }
}), UserController.register);

router.post("/login", passport.authenticate('local', {
  session: false
}), celebrate({
  body: {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
    projectId: Joi.string()
  }
}), UserController.login);

router.get('/auth/logout', UserController.logout);

// router.put('/update', passport.authenticate("jwt", { session: false }), UserController.update);
// router.patch('/update', passport.authenticate("jwt", { session: false }), UserController.update);

router.post('/upload', upload, UserController.uploadFile);

module.exports = router;