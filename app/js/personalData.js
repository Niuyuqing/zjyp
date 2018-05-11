// 注册
var personalDataMain = new Vue({
	el: '.personalDataMain',
	data: {
		customHeadBox: false
	},
	mounted: function() {},
	methods: {
		editHeadImg : function (val) {   // 点击编辑头像
			this.customHeadBox = val;
		}
	}
});

$(function() {
	// 遮罩层默认样式
	$('.mask').css({
		'width': $(document).width() + 'px',
		'height': $(document).height() + 'px'
	});
});