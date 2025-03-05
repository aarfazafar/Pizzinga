const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;
const connectToDatabase = require("./models/db");
connectToDatabase();

const FRONTEND = process.env.VITE_FRONTEND_URL || "http://localhost:5173";

// app.use(
//   cors({
//     origin:"*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(cors());

app.use(express.json());

app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api", require("./Routes/createUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/userLogin"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/MyOrderData"));
app.use("/api", require("./Routes/DeleteOrder"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
