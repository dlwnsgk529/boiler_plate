// node_env는 환경변수, loval이면 development, deploy한 후면 production임
if(process.env.NODE_ENV === 'production'){
	module.exports = require('./prod');
}else{
	module.exports = require('./dev');
}