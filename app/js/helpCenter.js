var freeRegistrMain = new Vue({
	el: '.freeRegistrMain',
	data: {
		goodsRelevant : true,   // 商品相关
		distribution : false,   // 配送
		payment : false,  // 付款
		afterSale : false,   // 售后
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
		// 商品相关
		goodsRelevantFn : function () {  
			this.goodsRelevant = true;   // 商品相关
			this.distribution = false;   // 配送
			this.payment = false;  // 付款
			this.afterSale = false;   // 售后
		},
		// 配送相关
		distributionFn : function () {  
			this.goodsRelevant = false;   // 商品相关
			this.distribution = true;   // 配送
			this.payment = false;  // 付款
			this.afterSale = false;   // 售后
		},
		// 付款相关
		paymentFn : function () {  
			this.goodsRelevant = false;   // 商品相关
			this.distribution = false;   // 配送
			this.payment = true;  // 付款
			this.afterSale = false;   // 售后
		},
		// 售后相关
		afterSaleFn : function () {  
			this.goodsRelevant = false;   // 商品相关
			this.distribution = false;   // 配送
			this.payment = false;  // 付款
			this.afterSale = true;   // 售后
		},
	}
});

$(function() {
	
});