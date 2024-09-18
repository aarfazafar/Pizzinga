const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const connectToDatabase = require("./models/db");
connectToDatabase();


const corsOptions = {
  origin: 'http://localhost:5173', // Allow the frontend origin
  optionsSuccessStatus: 200,
};

// Use CORS middleware
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// app.use((req, res, next)=> {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next();
// })
app.use(express.json());
app.use("/api", require("./Routes/createUser"));
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
