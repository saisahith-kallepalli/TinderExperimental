const { User } = require("../Schemas");
const express = require("express");
const userRoute = express.Router();
userRoute.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, age, gender } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
  });

  user
    .save()
    .then(() => {
      res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Error creating user",
        error: error.message,
      });
    });
});

userRoute.get("/user", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRoute.patch("/user", async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    age,
    gender,
    profilePhotoUri,
    bio,
    hobbies,
    listOfPhotos,
  } = req.body;
  const fieldsToUpdate = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "profilePhotoUri",
    "bio",
    "hobbies",
    "listOfPhotos",
  ];
  const isFieldsUpdateValid = Object.keys(req.body).every((field) =>
    fieldsToUpdate.includes(field),
  );
  if (!isFieldsUpdateValid) {
    throw new Error("Invalid fields to update");
  }
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, age, gender },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRoute.delete("/user", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRoute;
