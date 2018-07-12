var freeRegistrMain = new Vue({
	el: '.freeRegistrMain',
	data: {
		smfurniture : true,   // 实木家具
		pgfurniture : false,  // 皮革家具
		bySofa : false,  // 布艺沙发
		mattress : false,  // 床垫
		woodFloor : false,  // 木地板
		lighting : false,  // 灯饰
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
		smfurnitureFn : function () {
			this.smfurniture = true;   // 实木家具
			this.pgfurniture = false;  // 皮革家具
			this.bySofa = false;  // 布艺沙发
			this.mattress = false;  // 床垫
			this.woodFloor = false;  // 木地板
			this.lighting = false;  // 灯饰
		},
		pgfurnitureFn : function () {
			this.smfurniture = false;   // 实木家具
			this.pgfurniture = true;  // 皮革家具
			this.bySofa = false;  // 布艺沙发
			this.mattress = false;  // 床垫
			this.woodFloor = false;  // 木地板
			this.lighting = false;  // 灯饰
		},
		bySofaFn : function () {
			this.smfurniture = false;   // 实木家具
			this.pgfurniture = false;  // 皮革家具
			this.bySofa = true;  // 布艺沙发
			this.mattress = false;  // 床垫
			this.woodFloor = false;  // 木地板
			this.lighting = false;  // 灯饰
		},
		mattressFn : function () {
			this.smfurniture = false;   // 实木家具
			this.pgfurniture = false;  // 皮革家具
			this.bySofa = false;  // 布艺沙发
			this.mattress = true;  // 床垫
			this.woodFloor = false;  // 木地板
			this.lighting = false;  // 灯饰
		},
		woodFloorFn : function () {
			this.smfurniture = false;   // 实木家具
			this.pgfurniture = false;  // 皮革家具
			this.bySofa = false;  // 布艺沙发
			this.mattress = false;  // 床垫
			this.woodFloor = true;  // 木地板
			this.lighting = false;  // 灯饰
		},
		lightingFn : function () {
			this.smfurniture = false;   // 实木家具
			this.pgfurniture = false;  // 皮革家具
			this.bySofa = false;  // 布艺沙发
			this.mattress = false;  // 床垫
			this.woodFloor = false;  // 木地板
			this.lighting = true;  // 灯饰
		},
	}
});

$(function() {
	
});