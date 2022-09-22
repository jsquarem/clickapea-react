const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
/*---------- Public Routes ----------*/

// multer will define req.body, and req.file,
// in the controller function (in this case, signup)
// when a multipart/form-data request is sent to this endpoint
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

/*---------- Protected Routes ----------*/

module.exports = router;
