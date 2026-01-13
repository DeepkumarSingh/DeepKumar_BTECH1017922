const mongoose = require('mongoose');

const connectDB = async () => {
  try {
<<<<<<< HEAD
    const uri =
      process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGO_URL;

    if (!uri) {
      console.error(
        'Missing MongoDB connection string. Set `MONGODB_URI` or `MONGO_URI` in your environment.'
      );
      process.exit(1);
    }

    const conn = await mongoose.connect(uri);
=======
    console.log("ALL ENV KEYS:", Object.keys(process.env));
    console.log("MONGO_URI VALUE:", process.env.MONGO_URI);
>>>>>>> a0ff11069da0fc8a68568445ededf86e84b287ae

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

