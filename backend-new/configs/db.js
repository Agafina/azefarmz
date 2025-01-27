const mongoose = require('mongoose');
require('dotenv').config();



 const ConnectDB = () => {
    mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });
};

module.exports.ConnectDB = ConnectDB;