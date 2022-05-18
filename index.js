const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('To Do List is running')
})

app.listen(port, () => {
  console.log(`To do List on port ${port}`)
})