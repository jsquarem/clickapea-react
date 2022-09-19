const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
};

async function signup(req, res) {
  console.log(req.body, ' req.body in signup', req.file)
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    // comparePassword is coming from the user Model, 
    // this function will tell us if the password was correct
    // isMatch will be true if the password is correct
    // isMatch will be false if the password is incorrect
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        // if the passwords do match, 
        // create our jwt, with the users information
        // toJSON in our model will delete the password for us
        const token = createJWT(user);
        res.json({token}); // send the token back to the client
      } else {
        // if the passwords don't match we send back bad crendentials
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET, // stored on server, and is environment variable
    {expiresIn: '24h'}
  );
}
