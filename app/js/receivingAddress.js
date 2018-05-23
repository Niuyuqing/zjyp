// 注册
var personalDataMain = new Vue({
	el: '.personalDataMain',
	data: {
		editAddressBox: false, // 编辑收货地址弹框
		delBox: false, // 删除收货地址弹框
	},
	mounted: function() {},
	methods: {
		editAddressBoxFn: function(val) {
			this.editAddressBox = val;
			
			if (val==true) {
				// 一定是在为true的时候设置遮罩层高度，如果在页面进入设置高度，是无效的，因为还没有创建这个元素
				setTimeout(function () {
					$('.frameMask').css({
						width:$(window).width()+'px',
						height:document.body.scrollHeight+'px'
					});
					
					// 省市区要放在定时器里面初始化，因为默认是没有这个元素的
					$('#distpicker4').distpicker({
						province: '请选择',
						city: '请选择',
						district: '请选择',
						autoSelect: false
					});
				},100);
			}
		},
		delAddressBoxFn: function(val) {
			this.delBox = val;
			if (val==true) {
				// 一定是在为true的时候设置遮罩层高度，如果在页面进入设置高度，是无效的，因为还没有创建这个元素
				setTimeout(function () {
					$('.frameMask').css({
						width:$(window).width()+'px',
						height:document.body.scrollHeight+'px'
					});
				},100);
			}
		}
	}
});

$(function() {
	$('#distpicker5').distpicker({
		province: '请选择',
		city: '请选择',
		district: '请选择',
		autoSelect: false
	});
});