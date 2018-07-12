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
		name : '',
		phone : '',
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
		},
		addCustomizationInfo : function () {  // 保存定制信息
			this.$http.post('http://localhost:8083/zujahome-main/custom/addCustomizationInfo', {
				name : this.name,
				phone : this.phone
			}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				alert(data.body.data)
				// 保存成功清除信息
				if (data.body.status=='200') {
					this.name='';
					this.phone='';
				}
			}, function(a) {
				console.log('请求错误 ')
			});
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
