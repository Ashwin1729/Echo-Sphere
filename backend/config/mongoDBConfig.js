const mongoose = require("mongoose");

const connectMongoDB = async (callback) => {
  try {
    const client = await mongoose.connect(process.env.MONGODB_URI);
    callback(client);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = connectMongoDB;
