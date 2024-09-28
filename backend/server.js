const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const connectToDatabase = require("./models/db");
connectToDatabase();
const dotenv = require('dotenv')


const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
dotenv.config()

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use(express.json());
app.use("/api", require("./Routes/createUser"));
app.use("/api", require("./Routes/DisplayData"));

app.use("/api", require("./Routes/userLogin"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/MyOrderData"));
app.use("/api", require("./Routes/DeleteOrder"));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});



// app.use((req, res, next)=> {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next();
// })