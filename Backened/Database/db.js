const mongoose = require("mongoose");
// import mongoose from "mongoose";
const Connection = () => {
  try {
    console.log("Connection function called");
    const URL =
      process.env.MONGO_URI;

     mongoose
      .connect(URL)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        console.log("Error while connecting with the database ", error);
      });
  } catch (error) {
    console.log("Error in connection function ", error);
  }
};
module.exports = Connection;
