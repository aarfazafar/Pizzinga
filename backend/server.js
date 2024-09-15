const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const connectToDatabase = require('./models/db')
connectToDatabase();
app.get('/', (req, res)=> {
  res.send("Hello from server")
})
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})