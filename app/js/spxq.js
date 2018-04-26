var spxqMain = new Vue({
	el : '.spxqMain',
	data : {
	},
	mounted : function(){
		// 翻页器
		$('.paging').pagination({
			pageCount: 50,
			coping: true,
			mode:'fixed',
			activeCls : 'activeCls',
			homePage: '首页',
			endPage: '尾页',
			prevContent: '<img src="../build/images/prevPage.png"/>',
			nextContent: '<img src="../build/images/nextPage.png"/>',
			callback: function(api) {
				this.nowPageNum = api.getCurrent();
				console.log('bb:'+this.nowPageNum)
			}
		});
	},
	methods : {
		
	}
});

$(function () {
	// 配套方案
	$('.toPage a').css('color','#333');
	$('.toPage .spxq a').css('color','#cd2f1d');
	
	// 设置翻页距左边距离
	$('.pagingWrap .paging').css({
		'margin-left':($('.pagingWrap').width()-$('.pagingWrap .paging').width())/2+'px'
	});
});
