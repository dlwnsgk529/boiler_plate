const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// schema 생성
const userSchema = mongoose.Schema({
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

// index에서 model을 save하기 전에 아래 수행
userSchema.pre('save', function(next){
	var user = this; // userSchema
	if(user.isModified('password')){ // 비밀번호가 변환될 때만
		// salt 만들기, function은 콜백 function들
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if(err) return next(err)
			// 암호화
			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err) return next(err)
				user.password = hash // plain password를 hash로 교체
				next() // 다음으로
			});
		});
	}
	
})

// schema를 모델로 감싸기
const User = mongoose.model('User', userSchema)

module.exports = { User }