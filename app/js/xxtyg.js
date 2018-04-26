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
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.417854,39.921988);
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker);              // 将标注添加到地图中
	map.centerAndZoom(point, 15);
	var opts = {
	  width : 200,     // 信息窗口宽度
	  height: 100,     // 信息窗口高度
	  title : "海底捞王府井店" , // 信息窗口标题
	  enableMessage:true,//设置允许信息窗发送短息
	  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
	}
	var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象 
	marker.addEventListener("click", function(){          
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	});
	
	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
	
	map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
	map.addControl(top_left_control);        
	map.addControl(top_left_navigation);     
	map.addControl(top_right_navigation);   
});
