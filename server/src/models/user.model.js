import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import * as config from '../config/index.js';

const userSchema = new mongoose.Schema(
  {
    provider: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    password: { type: String, trim: true, minlength: 6, maxlength: 60 },
    name: String,
    photo: String,
    role: { type: String, default: 'USER' },
    // google
    googleId: { type: String, unique: true, sparse: true },
    // fb
    facebookId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // Check to see if password is modified. If it is, encrypt it. If not, execute next();
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }

  next();
});

userSchema.methods = {
  /**
   * Compare password - check if the passwords are the same
   *
   * @param {String} passwordEntered
   * @param {Function} done
   * @return {Function} callback
   */
  comparePassword: function (passwordEntered, done) {
    bcrypt.compare(passwordEntered, this.password, (err, isMatch) => {
      if (err) return done(err);
      done(null, isMatch);
    });
  },

  /**
   * Generate token
   *
   * @return {String} token
   */
  generateJWTToken: function () {
    const token = jwt.sign(
      {
        id: this._id,
        provider: this.provider,
        email: this.email,
        name: this.name,
        photo: this.photo,
        role: this.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: `${config.jwt.tokenExpirationMinutes}m` },
    );
    return token;
  },

  /**
   * Convert user model to JSON
   *
   * @return {Object} model as JSON
   */
  toJSON: function () {
    return {
      id: this._id,
      provider: this.provider,
      email: this.email,
      name: this.name,
      photo: this.photo,
      role: this.role,
    };
  },
};

const User = mongoose.model('User', userSchema);

export default User;
