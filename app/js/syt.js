// 注册
var sytMain = new Vue({
	el : '.sytMain',
	data : {
		weChatPay : true,
		alipay : false
	},
	mounted : function(){
		
	},
	methods : {
		switchWeChat : function () {  // 切换到微信支付
			this.weChatPay = true;
			this.alipay = false;
		},
		switchAlipay : function () { // 切换到支付宝支付
			this.weChatPay = false;
			this.alipay = true;
		}
	}
});
