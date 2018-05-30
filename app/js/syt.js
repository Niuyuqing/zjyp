// 注册
var sytMain = new Vue({
	el: '.sytMain',
	data: {
		weChatPay: true,
		alipay: false,
		payWay : '',  // 上个页面选择的支付方式
	},
	mounted: function() {
		// 上个页面选择的支付方式
		this.payWay = this.getUrlParam('pay');
		if (this.payWay=='1') {  // 微信
			this.weChatPay = true;
			this.alipay = false;
		} else if (this.payWay=='2'){  // 支付宝
			this.weChatPay = false;
			this.alipay = true;
		}
	},
	methods: {
		switchWeChat: function() { // 切换到微信支付
			this.weChatPay = true;
			this.alipay = false;
		},
		switchAlipay: function() { // 切换到支付宝支付
			this.weChatPay = false;
			this.alipay = true;
		},
		getUrlParam: function(key) { // 地址栏中文也可以正常获取
			// 获取参数
			var url = window.location.search;
			// 正则筛选地址栏
			var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
			// 匹配目标参数
			var result = url.substr(1).match(reg);
			//返回参数值
			return result ? decodeURIComponent(result[2]) : null;
		},
	}
});