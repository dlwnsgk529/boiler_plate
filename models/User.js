const mongoose = require('mongoose');

// schema 생성
const userSchema = mongoose.schema({
	name: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trim: true, //띄어쓰기 없애주는 역할
		unique : 1
	},
	password: {
		type: String,
		minlength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role: {
		type: Number,
		default: 0
	},
	image: String,
	token: {
		type: String
	},
	tokenExp: { // 토큰 유효기간
		type: Number
	}
	
})

// schema를 모델로 감싸기

const User = mongoose.model('User', userSchema)

module.exports = { User }