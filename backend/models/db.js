const mongoose = require ('mongoose')
const MONGO_URI = 'mongodb+srv://aarfazafar2:yZWqQo5M474FW4qN@cluster0.xethz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
module.exports = connectToDatabase;