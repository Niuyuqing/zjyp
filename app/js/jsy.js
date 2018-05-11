// 注册
var jsyMain = new Vue({
	el : '.jsyMain',
	data : {
		delBox : false,   // 默认不显示删除弹框和灰色遮罩层
		addBox : false,   // 默认不显示新增收货地址弹框
		unfoldAddress : false,   // 收起/展开地址
		weChatPay : true,   // 微信支付
		alipayPay : false,   // 支付宝支付
	},
	mounted : function(){
	},
	methods : {
		delConsigneeMsg : function (val) {   // 删除收货人信息
			this.delBox = val;
		},
		addConsigneeMsg : function (val) {   // 删除收货人信息
			this.addBox = val;
		},
		unfoldAddressClick : function () {  // 收起/展开地址
			this.unfoldAddress = !this.unfoldAddress;
		},
		weChatPayClick : function () {  // 点击微信支付
			this.weChatPay = true;
			this.alipayPay = false;
		},
		alipayPayClick : function () {   // 点击支付宝支付
			this.weChatPay = false;
			this.alipayPay = true;
		}
	}
});

$(function () {
	$('.frameMask').css({
		'width':$(document).width()+'px',
		'height':$(document).height()+'px'
	});
	
	$('.consigneeMsg').on({
		'mouseenter':function () {
			$(this).next().show();
			$(this).find($('.setDefAddress,.edit,.del')).show();
		},
		'mouseleave':function () {
			$(this).next().hide();
			$(this).find($('.setDefAddress,.edit,.del')).hide();
		}
	});
});
