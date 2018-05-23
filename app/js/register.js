// 注册
var registerFormWrap = new Vue({
	el: '.registerFormWrap',
	data: {
		agreement: true, // 是否勾选用户协议
		errorTip: false, // 错误提示消息是否显示
		errorTipMsg: '', // 错误提示消息文本
		phone: '',
		pwd: '',
		againPwd: '',
		codeNum: '',
		authCode: true, // 获取验证码按钮
		daoTime: 60, // 验证码倒计时
	},
	mounted: function() {

	},
	methods: {
		agreementClick: function() { // 用户协议点击
			this.agreement = !this.agreement;
		},
		getCodeNum: function() { // 获取验证码
			this.daoTime = 60; // 验证码倒计时
			if(!this.checkPhone(this.phone)) {
				this.errorTip = true;
				this.errorTipMsg = '请输入正确手机号码';
			} else {
				// 获取验证码接口
				this.$http.post('http://localhost:8083/zujahome-main/user/phoneAuthCode', {
					phone: this.phone
				}, {
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function(data) {
					if(data.body.status == '200') {
						this.errorTip = false;
						this.errorTipMsg = '';
						this.authCode = false;
						
						// 验证码倒计时
						var daoTimeFn = setInterval(function() {
							if(registerFormWrap.daoTime <= 1) {
								registerFormWrap.authCode = true;
								clearInterval(daoTimeFn);
							} else {
								registerFormWrap.daoTime--;
							}
						}, 1000);
					} else {
						this.errorTip = true;
						this.errorTipMsg = '验证码获取失败';
					}
				}, function(a) {
					console.log('请求错误 ')
				});
			}
		},
		registerClick: function() { // 点击注册
			if(!this.checkPhone(this.phone)) {
				this.errorTip = true;
				this.errorTipMsg = '请输入正确手机号码';
			} else if(!this.checkPwd(this.pwd)) {
				this.errorTip = true;
				this.errorTipMsg = '密码6-20位数字、字母、字符组合';
			} else if(this.pwd != this.againPwd) {
				this.errorTip = true;
				this.errorTipMsg = '两次密码输入不一致';
			} else if(this.codeNum == '') {
				this.errorTip = true;
				this.errorTipMsg = '请输入验证码';
			} else {
				this.errorTip = false;
				this.errorTipMsg = '';
				
				// 注册接口
				this.$http.post('http://localhost:8083/zujahome-main/user/register', {
					phone: this.phone,
					password : this.pwd,
					authcode : this.codeNum
				}, {
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function(data) {
					console.log(data.body);
					if (data.body.status=='200') {
						alert('注册成功');
						window.location.href='login.html';
					}else{
						this.errorTip = true;
						this.errorTipMsg = data.body.msg;
					}
				}, function(a) {
					console.log('请求错误 ')
				});
			}
		},
		checkPhone: function(val) { // 验证手机号
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			return reg.test(val);
		},
		checkPwd: function(val) { // 验证密码
			//var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
			var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;
			return reg.test(val);
		}
	}
});