const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const connectToDatabase = require('./models/db')
connectToDatabase();

app.get('/', (req, res)=> {
  res.send("Hello from server")
})

app.use(express.json());
app.use('/api',require('./Routes/createUser'))
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})