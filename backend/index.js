const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const url = 'mongodb+srv://calls002:'+password+'@cluster0.iraeblh.mongodb.net/?retryWrites=true&w=majority'

app.get('/today', (req, res) => {
  res.send('Hello World!')
})
app.get('/history', (req, res) => {
    res.send('Hello World!')
  })
  app.post('/today', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})