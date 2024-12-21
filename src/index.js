const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const MONGODB_URL =
  "mongodb+srv://quanhoangcnpm1:0988935298@clustercosmetic.gyug2.mongodb.net/";

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));



routes(app);

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect DB success");
  })
  .catch((error) => {
    console.error("Connect DB error:", error);
  });

app.listen(port, () => {
  console.log("Server is running in port:", port);
});
