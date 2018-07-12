var zjshjMain = new Vue({
	el: '.zjshjMain',
	data: {
		province: '',
		city: '',
		district: '',
		nowPageNum: 1,
		lifeHomeList : [],
	},
	mounted: function() {
		this.showLifeHomeList(); // 筑家生活家列表
	},
	methods: {
		// 筑家生活家列表
		showLifeHomeList: function() {
			this.$http.post('http://localhost:8083/zujahome-main/lifeHome/showLifeHomeList', {
				province: this.province,
				city: this.city,
				district: this.district,
				pageNum: this.nowPageNum
			}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				this.lifeHomeList = data.body.data.data;
				console.log(this.lifeHomeList);
				// 翻页器
				$('.paging').pagination({
					pageCount: data.body.data.totalPages,
					coping: true,
					mode: 'fixed',
					activeCls: 'activeCls',
					homePage: '首页',
					endPage: '尾页',
					prevContent: '<img src="../build/images/prevPage.png"/>',
					nextContent: '<img src="../build/images/nextPage.png"/>',
					callback: function(api) {
						zjshjMain.nowPageNum = api.getCurrent();

						zjshjMain.$http.post('http://localhost:8083/zujahome-main/lifeHome/showLifeHomeList', {
							province: zjshjMain.province,
							city: zjshjMain.city,
							district: zjshjMain.district,
							pageNum: zjshjMain.nowPageNum
						}, {
							headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							emulateJSON: true
						}).then(function(data) {
							zjshjMain.lifeHomeList = data.body.data.data;
						}, function(a) {
							console.log('请求错误 ')
						});
					}
				});

				// 设置翻页距左边距离
				$('.pagingWrap .paging').css({
					'margin-left': ($('.pagingWrap').width() - $('.pagingWrap .paging').width()) / 2 + 'px'
				});
			}, function(a) {
				console.log('请求错误 ')
			});
		},
		toSHJDetail : function (id) {
			window.location.href = 'zjshjDetail.html?id='+id;
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

	$('.toPage a').css('color', '#333');
	$('.toPage .zjshj a').css('color', '#cd2f1d');

});