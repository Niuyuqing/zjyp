// 注册
var personalDataMain = new Vue({
	el: '.personalDataMain',
	data: {
		editAddressBox : false,   // 编辑收货地址弹框
		delBox : false,  // 删除收货地址弹框
	},
	mounted: function() {},
	methods: {
		editAddressBoxFn : function (val) {
			this.editAddressBox = val;
		},
		delAddressBoxFn : function (val) {
			this.delBox = val;
		}
	}
});

$(function() {
	$('.frameMask').css({
		'width': $(document).width() + 'px',
		'height': $(document).height() + 'px'
	});
});