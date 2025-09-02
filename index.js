const express = require('express') // expres module 가져오기
const app = express() // funciton 이용해서 새로운 express 앱 생성
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jackpot03529:jackpot2003529@boilerplate.jj2c6mh.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate')
	.then( () => console.log('MongoDB Connected...') )
	.catch(err=> console.log(err))


app.get('/', (req, res) => {  res.send('Hello World!~안녕하세요')})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
