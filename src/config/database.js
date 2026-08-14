const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const connection = async () => await mongoose.connect(mongoURI);

module.exports = connection;
