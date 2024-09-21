const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://aarfazafar2:yZWqQo5M474FW4qN@cluster0.xethz.mongodb.net/pizzinga?retryWrites=true&w=majority&appName=Cluster0";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI,
    //    {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  );
    console.log("Connected to MongoDB");
    try {
      const fetched_data = await mongoose.connection.db.collection("pizza");
      const data = await fetched_data.find({}).toArray();  // Use await here instead of a callback
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
