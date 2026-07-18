const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Database Connection Warning: Failed to connect to Atlas MongoDB (${error.message}). Attempting fallback to local MongoDB...`);
    try {
      const localConn = await mongoose.connect("mongodb://127.0.0.1:27017/todo-app");
      console.log(`MongoDB Connected (Fallback Local): ${localConn.connection.host}`);
    } catch (localError) {
      console.error(`Database Connection Error: Local MongoDB fallback also failed (${localError.message})`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
