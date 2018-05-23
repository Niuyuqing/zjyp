//找回密码
var retrievePwdWrap = new Vue({
	el : '.retrievePwdWrap',
	data : {
		step1 : true,
		step2 : false,
		step3 : false,
		errorTip1 : false,   // 错误提示消息是否显示
		errorTipMsg1 : '',   // 错误提示消息文本
		errorTip2 : false,   // 错误提示消息是否显示
		errorTipMsg2 : '',   // 错误提示消息文本
		errorTip3 : false,   // 错误提示消息是否显示
		errorTipMsg3 : '',   // 错误提示消息文本
		phone : '',
		codeNum : '',
		pwd : '',
		againPwd : '',
		countDown : 3,   // 倒计时跳转到登录页
		daoTime: 60, // 验证码倒计时
		authCode: true, // 获取验证码按钮
	},
	mounted : function(){
		
	},
	methods : {
		nextStepClick : function () {  // 点击下一步
			if (!this.checkPhone(this.phone)) {
				this.errorTip1 = true;
				this.errorTipMsg1 = '请输入正确手机号码';
			} else if (this.codeNum==''){
				this.errorTip1 = true;
				this.errorTipMsg1 = '请输入验证码';
			} else {
				// 验证验证码接口
				this.$http.post('http://localhost:8083/zujahome-main/user/checkAuthCode', {
					phone : this.phone,
					authCode : this.codeNum
				} ,{   // 没有参数也要放空的大括号
		            headers: {   // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
		                'Content-Type': 'application/x-www-form-urlencoded'
		            },
		            emulateJSON: true
		        }).then(function(data) {
		            if(data.body.status=='200'){
		            	this.errorTip1 = false;
						this.errorTipMsg1 = '';
						
						this.step1 = false;
						this.step2 = true;
						this.step3 = false;
		            }else{
		            	this.errorTip1 = true;
						this.errorTipMsg1 = data.body.msg;
		            }
		        }, function(a) {
		            console.log('请求错误 ')
		        });
			}
		},
		saveClick : function () {  // 保存
			var that = this;
			if (!this.checkPwd(this.pwd)){
				this.errorTip2 = true;
				this.errorTipMsg2 = '密码6-20位数字、字母、字符组合';
			} else if (this.pwd!=this.againPwd){
				this.errorTip2 = true;
				this.errorTipMsg2 = '两次密码输入不一致';
			} else {
				// 重置密码接口
				this.$http.post('http://localhost:8083/zujahome-main/user/resettingPwd', {
					phone : this.phone,
					password : this.pwd
				} ,{   // 没有参数也要放空的大括号
		            headers: {   // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
		                'Content-Type': 'application/x-www-form-urlencoded'
		            },
		            emulateJSON: true
		        }).then(function(data) {
		            if(data.body.status=='200'){
		            	this.step1 = false;
						this.step2 = false;
						this.step3 = true;
						
						setInterval(function () {
							that.countDown--;
							console.log(typeof that.countDown)
							if (that.countDown==0) {
								window.location.href = 'login.html';
							}
						},1000);
		            }else{
		            	this.errorTip = true;
						this.errorTipMsg = data.body.msg;
		            }
		        }, function(a) {
		            console.log('请求错误 ')
		        });
			}
		},
		getCodeNum : function(){  // 获取验证码
			if (!this.checkPhone(this.phone)) {
				this.errorTip1 = true;
				this.errorTipMsg1 = '请输入正确手机号码';
			} else {
				this.errorTip1 = false;
				this.errorTipMsg1 = '';
				
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
							if(retrievePwdWrap.daoTime <= 1) {
								retrievePwdWrap.authCode = true;
								clearInterval(daoTimeFn);
							} else {
								retrievePwdWrap.daoTime--;
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
		checkPhone : function (val) {  // 验证手机号
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			return reg.test(val);
		},
		checkPwd : function (val) {  // 验证密码
			//var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
			var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;
			return reg.test(val);
		}
	}
});