const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initate the S3 constructor which can talk to aws/s3 our bucket!
// import uuid to help generate random names
const { v4: uuidv4 }= require('uuid')
// since we are sharing code, when you pull you don't want to have to edit the 
// the bucket name, thats why we're using an environment variable
const BUCKET_NAME = process.env.AWS_BUCKET_NAME

module.exports = {
  signup,
  login
};

async function signup(req, res) {
  console.log(req.body, ' req.body in signup', req.file)

  
 if(!req.file) return res.status(400).json({err: 'Please submit Photo!'});
  // Create the key that we will store in the s3 bucket name
  // pupstagram/ <- will upload everything to the bucket so it appears
  // like its an a folder (really its just nested keys on the bucket)
  const key = `pupstagram/${req.file.originalname}-${uuidv4()}`;
  const params = {Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer};

  s3.upload(params, async function(err, data){
    // inside of the callback is a response from AWS!
    console.log('========================')
    console.log(err, " <--- err from aws")
    console.log('========================')
    if(err) return res.status(400).json({err: 'Error from aws, check the server terminal!, you bucket name or keys are probley wrong'}); 

    // data.Location <- should be the say as the key but with the aws domain
    // its where our photo is hosted on our s3 bucket
    const user = new User({...req.body, photoUrl: data.Location});
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      console.log(err)
      // Probably a duplicate email
      res.status(400).json(err);
    }


  })


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
