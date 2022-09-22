const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    newsletter: Boolean,
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  },
  {
    timestamps: true,
  }
);

// an event listener for whenever a user document
// is being transformed into JSON (Thats happening in our contoller)
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  },
});

// this is if you populate the user
userSchema.set('toObject', {
  transform: (doc, ret, opt) => {
    delete ret.password;
    return ret;
  },
});

// DO NOT DEFINE instance methods with arrow functions,
// they prevent the binding of this
userSchema.pre('save', function (next) {
  // 'this' will be set to the current document
  const user = this;
  // check to see if the user has been modified, if not proceed
  // in the middleware chain
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next(); // tell user.save to add the stuff to the database,
    // now that we've encrypted the user's password
  });
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
  // console.log(cb, ' this is cb');
  // 'this' represents the document that you called comparePassword on
  // this.password is the hash in the database
  bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch); // tell the comparePassword function
    // in our Login controller, the passwords match, or they don't
  });
};

module.exports = mongoose.model('User', userSchema);
