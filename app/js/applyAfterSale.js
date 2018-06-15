var indexPage = new Vue({
	el: '.indexPage',
	data: {
		
	},
	mounted: function() {
		// 商品分类接口
		this.$http.post('http://localhost:8083/zujahome-main/item/showItemClassifyList', {}, { // 没有参数也要放空的大括号
			headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			emulateJSON: true
		}).then(function(data) {
			console.log(JSON.parse(JSON.parse(data.body.data).rows[0].cat_info));
		}, function(a) {
			console.log('请求错误 ')
		});
	},
	methods: {
		
	}
});
