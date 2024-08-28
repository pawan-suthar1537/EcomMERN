const mongoose = require("mongoose");

const connect = () => {
  return mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log("Error in DB connection: " + error);
    });
};

module.exports = connect;
