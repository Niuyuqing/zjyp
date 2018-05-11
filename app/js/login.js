// 注册
var loginFormWrap = new Vue({
	el : '.loginFormWrap',
	data : {
		errorTip : false,   // 错误提示消息是否显示
		errorTipMsg : '',   // 错误提示消息文本
		phone : '',
		pwd : '',
	},
	mounted : function(){
		
	},
	methods : {
		loginClick : function () {   // 点击登录
			if (!this.checkPhone(this.phone)) {
				this.errorTip = true;
				this.errorTipMsg = '请输入正确手机号码';
			} else if (this.pwd==''){
				this.errorTip = true;
				this.errorTipMsg = '请输入密码';
			} else {
				this.errorTip = false;
				this.errorTipMsg = '';
				
				
			}
		},
		checkPhone : function (val) {  // 验证手机号
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			return reg.test(val);
		}
	}
});
