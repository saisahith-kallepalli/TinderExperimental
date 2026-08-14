const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const connection = require("./config/database");
const { feedRoute, userRoute } = require("./routes");
app.use(express.json());
app.use("/api/auth", userRoute);
app.use("/api/feed", feedRoute);
connection()
  .then(() => {
    console.info("You successfully connected to MongoDB!");
    app.listen(port, async () => {
      console.info("successfully connected to port " + port);
    });
  })
  .catch((error) => console.error(error.message, error));
// Start the server
