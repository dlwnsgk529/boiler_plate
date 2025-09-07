const express = require('express') // expres module 가져오기
const app = express() // funciton 이용해서 새로운 express 앱 생성
const port = 5000
const bodyParser = require('body-parser');
const { User } = require('./models/User'); // user.js 가져오기

// application/x-www-form-erlencoded <= 데이터를 분석해서 가져올 수 있게 해주는 거
app.use(express.urlencoded({extended: true}));
// application/json <= json 타입으로 된 데이터 분석해서 가져올 수 있게 해줌
app.use(express.json())
// 강의와 다른 점, express는 이제 bodyparser가 포함되어있어 굳이 다운하거나 bodyparser에서 위 두개를 안 가져와도 됨


const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
	.then( () => console.log('MongoDB Connected...') )
	.catch(err=> console.log(err))

app.get('/', (req, res) => {  res.send('Hello World!~')})



app.post('/register', (req,res) => {
	// 회원가입할 때 필요한 정보들을 client에서 가져오면
	// 정보들을 데이터 베이스에 저장
	
	// body-parser를 이용해서 req.body에 client에서 보내는 정보를 보관 가능
	const user = new User(req.body)
	
	// mongodb의 method, 정보들이 user model에 저장
	user.save()
        .then((userInfo) => res.status(200).json({ success: true }))
        .catch((err) => res.json({ success: false, err })
	);
	// 강의와 다른 점, save함수가 더이상 콜백을 인자로 안 받아서 이렇게 해줘야함
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
