// 注册
var registerFormWrap = new Vue({
	el : '.registerFormWrap',
	data : {
		agreement : true,  // 是否勾选用户协议
		errorTip : false,   // 错误提示消息是否显示
		errorTipMsg : '',   // 错误提示消息文本
		phone : '',   
		pwd : '',
		againPwd : '',
		codeNum : '',
	},
	mounted : function(){
		
	},
	methods : {
		agreementClick : function () {  // 用户协议点击
			this.agreement = !this.agreement;
		},
		getCodeNum : function(){  // 获取验证码
			if (!this.checkPhone(this.phone)) {
				this.errorTip = true;
				this.errorTipMsg = '请输入正确手机号码';
			} else {
				this.errorTip = false;
				this.errorTipMsg = '';
			}
		},
		registerClick : function () {   // 点击注册
			if (!this.checkPhone(this.phone)) {
				this.errorTip = true;
				this.errorTipMsg = '请输入正确手机号码';
			} else if (!this.checkPwd(this.pwd)){
				this.errorTip = true;
				this.errorTipMsg = '密码6-20位数字、字母、字符组合';
			} else if (this.pwd!=this.againPwd){
				this.errorTip = true;
				this.errorTipMsg = '两次密码输入不一致';
			} else if (this.codeNum == ''){
				this.errorTip = true;
				this.errorTipMsg = '请输入验证码';
			} else {
				this.errorTip = false;
				this.errorTipMsg = '';
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
