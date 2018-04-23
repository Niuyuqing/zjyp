var zjshjMain = new Vue({
	el : '.zjshjMain',
	data : {
		choseLabelArr : [
			{name:'北京'},
			{name:'深圳'},
			{name:'不限'},
		],
		cityLabelArr : [
			{name:'北京'},
			{name:'韩国'},
			{name:'日本'},
			{name:'天津'},
			{name:'深圳'},
			{name:'广东'},
			{name:'北京'},
			{name:'韩国'},
			{name:'日本'},
			{name:'天津'},
			{name:'深圳'},
			{name:'广东'},
			{name:'北京'},
			{name:'韩国'},
			{name:'日本'},
			{name:'天津'},
			{name:'深圳'},
			{name:'广东'},
			{name:'北京'},
			{name:'韩国'},
			{name:'日本'},
			{name:'天津'},
			{name:'深圳'},
			{name:'广东'},
		],
		showCityLabel : false,
		showStyleLabel : false
	},
	mounted : function(){
		
	},
	methods : {
		closeLabel : function (e) {  // 删除当前选中的小标签
			$(e.target).parent().remove();
		},
		addLabel : function (e) {   // 添加筛选项
			this.choseLabelArr.push({
				'name':$(e.target).text()
			});
		},
		showCityLabelClick : function () {
			this.showCityLabel = !this.showCityLabel;
			console.log(this.showCityLabel)
			if (this.showCityLabel) {
				$('.chooseArea .city').css({
					'overflow':'inherit',
					'height':'auto'
				});
			}else{
				$('.chooseArea .city').css({
					'overflow':'hidden',
					'height':'2.666666rem'
				});
			}
		},
		showStyleLabelClick : function () {
			this.showStyleLabel = !this.showStyleLabel;
			if (this.showStyleLabel) {
				$('.chooseArea .styles').css({
					'overflow':'inherit',
					'height':'auto'
				});
			}else{
				$('.chooseArea .styles').css({
					'overflow':'hidden',
					'height':'2.666666rem'
				});
			}
		}
	}
});

$(function () {
	// 配套方案
	$('.toPage a').css('color','#333');
	$('.toPage .zjh a').css('color','#cd2f1d');
	
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
			console.log(api.getCurrent())
		}
	});
	
	// 设置翻页距左边距离
	$('.pagingWrap .paging').css({
		'margin-left':($('.pagingWrap').width()-$('.pagingWrap .paging').width())/2+'px'
	});
});