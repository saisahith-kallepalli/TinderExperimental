const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const validator = require("validator");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        if (validator.isEmail(value)) true;
        else throw new Error("Invalid email address");
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  profilePhotoUri: {
    type: String,
    default:
      "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
    validate: {
      validator: (value) => {
        if (validator.isURL(value)) true;
        else throw new Error("Invalid Profile Photo URL");
      },
    },
  },
  bio: {
    type: String,
    default: "I am a new user.",
  },
  hobbies: {
    type: [String],
    maxlength: 10,
  },
  listOfPhotos: {
    type: [String],
    maxlength: 5,
    validate: {
      validator: (value) => {
        if (value.every((url) => validator.isURL(url))) true;
        else throw new Error("Invalid URL in list Of Photos");
      },
    },
  },
});

const User = model("User", userSchema);

module.exports = User;
