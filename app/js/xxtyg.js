$(function () {
	$('.toPage a').css('color','#333');
	$('.toPage .xxtyg a').css('color','#cd2f1d');
	
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
//			this.nowPageNum = api.getCurrent();
//			console.log('bb:'+this.nowPageNum)
		}
	});
	
	// 设置翻页距左边距离
	$('.pagingWrap .paging').css({
		'margin-left':($('.pagingWrap').width()-$('.pagingWrap .paging').width())/2+'px'
	});
	
	// 百度地图API功能
	var map = new BMap.Map("allmap"); // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes: [
			BMAP_NORMAL_MAP,
			BMAP_HYBRID_MAP
		]
	}));
	
	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
	
	map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
	map.addControl(top_left_control);        
	map.addControl(top_left_navigation);     
	map.addControl(top_right_navigation);   
});
