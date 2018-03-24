var mongoose = require("mongoose");
var connectionString = "mongodb://trevor:test@ds028679.mlab.com:28679/vue-music";

var connection = mongoose.connection;
mongoose.connect(connectionString);

connection.on("error", err => {
  console.error("mlab Error: ", err);
});

connection.on("open", () => {
  console.log("mLab is up!");
});