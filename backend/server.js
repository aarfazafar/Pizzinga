const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;
const connectToDatabase = require("./models/db");
connectToDatabase();

const FRONTEND = process.env.VITE_FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin:[FRONTEND, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization"],
    credentials: true,
  })
);

app.use(express.json());

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
