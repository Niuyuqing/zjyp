var orderDetailMain = new Vue({
	el: '.orderDetailMain',
	data: {
		takeGoods: true, // 收货   -- 三个大状态
		dfkText: true,
		dfhText: true,
		dshText: true,
		yshText: true,
		refundMoney: false, // 退款   -- 三个大状态
		cancleOrder: false, // 取消   -- 三个大状态
		orderId: '',
		orderDetail: "", // 订单信息信息
	},
	mounted: function() {
		this.orderId = this.getUrlParam('oid'); // orderId

		this.$http.post('http://localhost:8083/zujahome-main/order/showOrderDetail', {
			orderId: this.orderId
		}, { // 没有参数也要放空的大括号
			headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			emulateJSON: true
		}).then(function(data) {
			this.orderDetail = data.body.data;
			console.log(data.body.data);
		}, function(a) {
			console.log('请求错误 ')
		});

		/*var result = {
			"data": {
				"buyerMessage": null,
				"buyerNick": "一米阳光三寸暖123",
				"buyerRate": 0,
				"cancelReason": null,
				"cancelStatus": 0,
				"closeTime": null,
				"consignTime": null,
				"createTime": 1528082048000,
				"delStatus": null,
				"endTime": null,
				"orderDetail": [{
					"itemId": "15330",
					"itemNum": 1,
					"data": {
						"original_img": "http://image.youjiagou.com/images/s-20161105/81/3785070fe6d01451f6a2095c173fe5c7.jpeg",
						"goods_name": "进口美楸 头层牛皮 美式风格 实木床尾凳 真皮床凳 换鞋凳",
						"price": "3162.00",
						"goods_id": "15330",
						"attr": [{
							"attrValue": "深樱桃色",
							"attrName": "颜色"
						}]
					},
					"type": "1"
				}],
				"orderId": "2018060411140800105",
				"orderItems": [{
					"id": "2018060411140800106",
					"itemId": "15330",
					"num": 1,
					"orderId": "2018060411140800105",
					"type": "1"
				}],
				"orderShipping": {
					"created": 1528082048000,
					"orderId": "2018060411140800105",
					"receiverAddress": "22",
					"receiverCity": "齐齐哈尔市",
					"receiverDistrict": "黑龙江省",
					"receiverMobile": "17852652325",
					"receiverName": "11",
					"receiverPhone": null,
					"receiverState": "梅里斯达斡尔族区",
					"receiverZip": null,
					"updated": 1528082048000
				},
				"payment": "3162.0",
				"paymentTime": null,
				"paymentType": null,
				"postFee": null,
				"refundStatus": 2,
				"shippingCode": null,
				"shippingName": null,
				"status": 1,
				"updateTime": 1528082048000,
				"userId": "10"
			},
			"msg": "OK",
			"status": 200
		}

		this.orderDetail = result.data;*/
	},
	methods: {
		getUrlParam: function(key) { // 地址栏中文也可以正常获取
			// 获取参数
			var url = window.location.search;
			// 正则筛选地址栏
			var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
			// 匹配目标参数
			var result = url.substr(1).match(reg);
			//返回参数值
			return result ? decodeURIComponent(result[2]) : null;
		},

	}
});

$(function() {});