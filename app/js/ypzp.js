var ypzpMain = new Vue({
	el: '.ypzpMain',
	data: {
		bedRoomList: [], // 卧室家具
		livingRoomList: [], // 客厅家具
		diningRoomList: [], // 餐厅家具
		studyRoomList: [], // 书房家具
		childrenRoomList: [], // 儿童房家具
	},
	mounted: function() {
		this.showYoupinList('1');
		this.showYoupinList('2');
		this.showYoupinList('3');
		this.showYoupinList('4');
		this.showYoupinList('5');
	},
	methods: {
		// 展示优品宅配
		showYoupinList: function(id) {
			this.$http.post('http://localhost:8083/zujahome-main/youpin/showYoupinList', {
				youpinCatId: id
			}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				if(id == '1') { // 卧室家具
					this.bedRoomList = data.body.data.data;
					console.log(this.bedRoomList);
				} else if(id == '2') { // 客厅家具
					this.livingRoomList = data.body.data.data;
				} else if(id == '3') { // 餐厅家具
					this.diningRoomList = data.body.data.data;
				} else if(id == '4') { // 书房家具
					this.studyRoomList = data.body.data.data;
				} else if(id == '5') { // 儿童房家具
					this.childrenRoomList = data.body.data.data;
				}
			}, function(a) {
				console.log('请求错误 ')
			});
		},
	}
});

$(function() {
	$('.toPage a').css('color', '#333');
	$('.toPage .ypzp a').css('color', '#cd2f1d');
});