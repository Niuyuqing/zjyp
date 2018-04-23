var qwdzMain = new Vue({
	el : '.qwdzMain',
	data : {
		firTitle : true, 
		secTitle : false,
		thrTitle : false,
		firSubTitle : true,
		secSubTtile : false,
		thiSubTitle : false,
		fouSubTitle :false,
		fiveSubTitle : false,
		sixSubTitle : false,
	},
	mounted : function(){
		
	},
	methods : {
		firTitleClick : function () {
			this.firTitle = true;
			this.secTitle = false;
			this.thrTitle = false;
		},
		secTitleClick : function () {
			this.firTitle = false;
			this.secTitle = true;
			this.thrTitle = false;
		},
		thrTitleClick : function () { 
			this.firTitle = false;
			this.secTitle = false;
			this.thrTitle = true;
		},
		firSubTitleClick : function () {
			this.firSubTitle = true;
			this.secSubTtile = false;
			this.thiSubTitle = false;
			this.fouSubTitle = false;
			this.fiveSubTitle = false;
			this.sixSubTitle = false;
		},
		secSubTtileClick : function () {
			this.firSubTitle = false;
			this.secSubTtile = true;
			this.thiSubTitle = false;
			this.fouSubTitle = false;
			this.fiveSubTitle = false;
			this.sixSubTitle = false;
		},
		thiSubTitleClick : function () {
			this.firSubTitle = false;
			this.secSubTtile = false;
			this.thiSubTitle = true;
			this.fouSubTitle = false;
			this.fiveSubTitle = false;
			this.sixSubTitle = false;
		},
		fouSubTitleClick : function () {
			this.firSubTitle = false;
			this.secSubTtile = false;
			this.thiSubTitle = false;
			this.fouSubTitle = true;
			this.fiveSubTitle = false;
			this.sixSubTitle = false;
		},
		fiveSubTitleClick : function () {
			this.firSubTitle = false;
			this.secSubTtile = false;
			this.thiSubTitle = false;
			this.fouSubTitle = false;
			this.fiveSubTitle = true;
			this.sixSubTitle = false;
		},
		sixSubTitleClick : function () {
			this.firSubTitle = false;
			this.secSubTtile = false;
			this.thiSubTitle = false;
			this.fouSubTitle = false;
			this.fiveSubTitle = false;
			this.sixSubTitle = true;
		}
	}
});

$(function () {
	// 全屋定制
	$('.toPage a').css('color','#333');
	$('.toPage .qwdz a').css('color','#cd2f1d');
	
	// 首页banner轮播
	var mySwiper = new Swiper('.swiper-container', {
	  navigation: {
	    nextEl: '.swiper-button-next',
	    prevEl: '.swiper-button-prev',
	  },
	});
});
