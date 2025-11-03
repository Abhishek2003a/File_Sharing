const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const Connection = require("./Database/db.js");
const router = require("./routes/api.js");
const cors = require("cors");

const PORT = process.env.PORT;

app.use(cors());
app.use("/", router);
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
Connection();
