const mongoose = require("mongoose");

const dotenv = require('dotenv')
dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI,
  );
    console.log("Connected to MongoDB");
    try {
      const fetched_data = await mongoose.connection.db.collection("pizza");
      const data = await fetched_data.find({}).toArray();  
      // console.log(data);
      global.food_items = data;
      // console.log(global.food_items);

    } catch (err) {
      console.error(err);  
    }
    
    // console.log(fetched_data)
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
module.exports = connectToDatabase;
