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
		againPwd : ''
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
				this.errorTip1 = false;
				this.errorTipMsg1 = '';
				
				this.step1 = false;
				this.step2 = true;
				this.step3 = false;
			}
		},
		saveClick : function () {  // 保存
			if (!this.checkPwd(this.pwd)){
				this.errorTip2 = true;
				this.errorTipMsg2 = '密码6-20位数字、字母、字符组合';
			} else if (this.pwd!=this.againPwd){
				this.errorTip2 = true;
				this.errorTipMsg2 = '两次密码输入不一致';
			} else {
				this.step1 = false;
				this.step2 = false;
				this.step3 = true;
			}
		},
		getCodeNum : function(){  // 获取验证码
			if (!this.checkPhone(this.phone)) {
				this.errorTip1 = true;
				this.errorTipMsg1 = '请输入正确手机号码';
			} else {
				this.errorTip1 = false;
				this.errorTipMsg1 = '';
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