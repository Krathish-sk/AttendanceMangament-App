import mongoose from "mongoose";
// const url = process.env.MOONGODB_URL;

// console.log("Url", url);

const connectDB = async function (url) {
  try {
    const connect = await mongoose.connect(url);
    console.log("Connected to MongoDB", connect.connection.name);
  } catch (error) {
    console.log("Error in connecting to mongodb", error);
  }
};

export default connectDB;
