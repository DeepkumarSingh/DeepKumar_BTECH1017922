const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGO_URL;

    if (!uri) {
      console.error(
        'Missing MongoDB connection string. Set `MONGODB_URI` or `MONGO_URI` in your environment.'
      );
      process.exit(1);
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

