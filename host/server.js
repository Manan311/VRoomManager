var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080

app.use(express.static("build"));

app.listen(HTTP_PORT, () => {
  console.log("Ready to handle requests on port " + HTTP_PORT);
});