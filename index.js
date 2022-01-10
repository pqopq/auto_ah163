var request = require('request')
var t = require("./util")
var token_data = process.env.TOKEN_DATA

if(!token_data){
	return console.log('请设置TOKEN_DATA!')
}else{
	function getToken(a) {
		var s = JSON.parse(t.Decrypt(a))
		var i = JSON.parse(s.data)
		var h = i.token;
		return h
	}
	
	var a = {
		queryDate: t.formatTime(new Date()),
		phone: getToken(token_data)
	}
	
	var headers = {
	    'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3171 MMWEBSDK/20211001 Mobile Safari/537.36 MMWEBID/2246 MicroMessenger/8.0.16.2040(0x28001077) Process/appbrand1 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
	    'Content-Type': 'application/json',
	    'Referer': 'https://servicewechat.com/wxd4e4a53c00d1a511/0/page-frame.html',
	    'Connection': 'keep-alive',
	    'Host': 'llhb.ah163.net'
	}
	
	var body = '{"para":"'+t.Encrypt(JSON.stringify(a))+'"}'
	
	var options = {
	    url: 'https://llhb.ah163.net/ah_red_come/app/userSign',
	    method: 'POST',
	    headers: headers,
	    body: body
	};
	
	function callback(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        console.log(JSON.parse(t.Decrypt(body)))
	    }
	}
	request(options, callback)
}

