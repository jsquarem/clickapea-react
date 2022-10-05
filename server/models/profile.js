const mongoose = require('mongoose');
const User = require('mongoose').model('User');

const profileSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  }
);

profileSchema.statics.findByEmail = function (email, callback) {
  const query = this.findOne();
  User.findOne({ email: email }, function (error, user) {
    query.where({ profile: user._id }).exec(callback);
  });
  return query;
};

module.exports = mongoose.model('Profile', profileSchema);
