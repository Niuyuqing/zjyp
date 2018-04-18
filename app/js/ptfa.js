var ptfaPage = new Vue({
	el : '.ptfaPage',
	data : {
		allRoom : true,  // 全部空间
		diningRoom : false,  // 客餐厅
		bedRoom : false,  // 卧房
		childrenRoom : false,  // 儿童房
		studyRoom : false,  // 书房
	},
	mounted : function(){
		
	},
	methods : {
		allRoomClick : function () {  // 全部空间点击
			this.allRoom = true;
			this.diningRoom = false;
			this.bedRoom = false;	
			this.childrenRoom = false;
			this.studyRoom = false;
		},
		diningRoomClick : function () {  // 客餐厅点击
			this.allRoom = false;
			this.diningRoom = true;
			this.bedRoom = false;	
			this.childrenRoom = false;
			this.studyRoom = false;
		},
		bedRoomClick : function () {  // 卧房点击
			this.allRoom = false;
			this.diningRoom = false;
			this.bedRoom = true;	
			this.childrenRoom = false;
			this.studyRoom = false;
		},
		childrenRoomClick : function () {  // 儿童房点击
			this.allRoom = false;
			this.diningRoom = false;
			this.bedRoom = false;	
			this.childrenRoom = true;
			this.studyRoom = false;
		},
		studyRoomClick : function () {  // 书房点击
			this.allRoom = false;
			this.diningRoom = false;
			this.bedRoom = false;	
			this.childrenRoom = false;
			this.studyRoom = true;
		}
	}
});

$(function () {
	// 配套方案
	$('.toPage a').css('color','#333');
	$('.toPage .ptfa a').css('color','#cd2f1d');
	
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
