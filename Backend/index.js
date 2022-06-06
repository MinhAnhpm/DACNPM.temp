const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const https = require("https");
const path = require("path");
const fs = require("fs");

dotenv.config();
app.use(cors());
app.use(express.json());

const userRoute = require("./routers/router");

app.use(userRoute);

const httpsServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

// app.listen(process.env.PORT, () => {
//   console.log("Server listen on port: " + process.env.PORT);
// });
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Server API is runnning port ' + port);