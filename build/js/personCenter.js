/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	// 注册
	'use strict';
	
	var loginWrap = new Vue({
		el: '.loginWrap',
		data: {
			nowPageNum: 1, // 当前页页码
			cancleBox: false, // 取消订单弹框
			cancleSuccBox: false, // 取消订单成功弹框
			delBox: false, // 删除弹框
			delOrderId: '', // 删除订单ID
			allOrder: true, // 全部订单
			waitPay: false, // 待付款
			alreadyPay: false, // 已付款
			waitTakeGoods: false, // 待收货
			waitAssess: false, // 待评价
			cancelSuccess: false, // 已取消
			pageNum: 1, // 订单列表当前页
			orderList: [], // 订单
			nowPageNum: 1, // 订单页码
			status: '', // 订单状态
			cancleResult: '', // 取消订单理由
			cancelOrderId: '', // 取消订单的orderID
			checkGoodsPic: [],
			itemIdAndNum: [] },
		// itemId和数量，给结算页用
		mounted: function mounted() {
			this.showOrderList(''); // 展示订单列表
		},
		methods: {
			showOrderList: function showOrderList(status) {
				// 展示订单列表
				this.$http.post('http://localhost:8083/zujahome-main/order/showOrderList', {
					pageNum: this.pageNum,
					status: status
				}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					this.orderList = data.body.data.data;
	
					setTimeout(function () {
						for (var i = 0; i < $('.orderBox').length; i++) {
							$('.rCont').eq(i).css({
								'height': $('.lConts').eq(i).height() + 'px'
							});
						};
	
						// 订单状态非1
						for (var j = 0; j < $('.orderBoxWrap .goodsLine').length; j++) {
							$('.orderSuccWrap .totalPrice').eq(j).css({
								'height': $('.goodsLine').eq(j).height() + 'px'
							});
							$('.orderSuccWrap .status').eq(j).css({
								'height': $('.goodsLine').eq(j).height() + 'px'
							});
						}
					}, 1000);
	
					// 翻页器
					$('.paging').pagination({
						pageCount: data.body.data.totalPages,
						coping: true,
						mode: 'fixed',
						activeCls: 'activeCls',
						homePage: '首页',
						endPage: '尾页',
						prevContent: '<img src="./images/prevPage.png"/>',
						nextContent: '<img src="./images/nextPage.png"/>',
						callback: function callback(api) {
							loginWrap.pageNum = api.getCurrent();
	
							loginWrap.$http.post('http://localhost:8083/zujahome-main/order/showOrderList', {
								pageNum: loginWrap.pageNum,
								status: status
							}, { // 没有参数也要放空的大括号
								headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								emulateJSON: true
							}).then(function (data) {
								loginWrap.orderList = data.body.data.data;
	
								setTimeout(function () {
									for (var i = 0; i < $('.orderBox').length; i++) {
										$('.rCont').eq(i).css({
											'height': $('.lConts').eq(i).height() + 'px'
										});
									};
	
									// 订单状态非1
									for (var j = 0; j < $('.orderBoxWrap .goodsLine').length; j++) {
										$('.orderSuccWrap .totalPrice').eq(j).css({
											'height': $('.goodsLine').eq(j).height() + 'px'
										});
										$('.orderSuccWrap .status').eq(j).css({
											'height': $('.goodsLine').eq(j).height() + 'px'
										});
									};
								}, 1000);
							}, function (a) {
								console.log('请求错误 ');
							});
						}
					});
				}, function (a) {
					console.log('请求错误 ');
				});
	
				/*var result = {
	   	"data": {
	   		"totalRecords": 1,
	   		"data": [{
	   			"data": [{
	   				"afterSaleStatus": 0,
	   				"aftersaleShippingCode": null,
	   				"buyerMessage": null,
	   				"buyerNick": "晴儿",
	   				"buyerRate": 0,
	   				"cancelReason": null,
	   				"closeTime": null,
	   				"consignTime": null,
	   				"createTime": 1530087014000,
	   				"delStatus": null,
	   				"endTime": null,
	   				"orderDetail": {
	   					"itemId": "24952",
	   					"itemNum": 2,
	   					"data": {
	   						"original_img": "http://image4.youjiagou.com/images/s-20171215/99/5e6689a1bcd9af30ec8212e08b282eaa.jpeg?zjyp=1",
	   						"goods_name": "现代茶几 小户型客厅创意长方形茶桌 环保家具",
	   						"price": "2415.00",
	   						"goods_id": "24952",
	   						"attr": [{
	   							"attrValue": "1200mm",
	   							"attrName": "长度"
	   						}]
	   					},
	   					"type": "1"
	   				},
	   				"orderId": "2018062716101400320",
	   				"orderItem": {
	   					"id": "2018062716101400321",
	   					"itemId": "24952",
	   					"num": 2,
	   					"orderId": "2018062716101400320",
	   					"type": "1"
	   				},
	   				"orderShipping": {
	   					"created": 1530087015000,
	   					"orderId": "2018062716101400319",
	   					"receiverAddress": "11",
	   					"receiverCity": "鄂尔多斯市",
	   					"receiverDistrict": "内蒙古自治区",
	   					"receiverMobile": "13025652356",
	   					"receiverName": "11",
	   					"receiverPhone": null,
	   					"receiverState": "鄂托克前旗",
	   					"receiverZip": null,
	   					"updated": 1530087015000
	   				},
	   				"parentOrderId": null,
	   				"payment": "4830.0",
	   				"paymentTime": null,
	   				"paymentType": null,
	   				"postFee": null,
	   				"refundStatus": 0,
	   				"shippingCode": null,
	   				"shippingName": null,
	   				"status": 1,
	   				"updateTime": 1530087014000,
	   				"userId": "2018060710325300135"
	   			}, {
	   				"afterSaleStatus": 0,
	   				"aftersaleShippingCode": null,
	   				"buyerMessage": null,
	   				"buyerNick": "晴儿",
	   				"buyerRate": 0,
	   				"cancelReason": null,
	   				"closeTime": null,
	   				"consignTime": null,
	   				"createTime": 1530087014000,
	   				"delStatus": null,
	   				"endTime": null,
	   				"orderDetail": {
	   					"itemId": "15985",
	   					"itemNum": 2,
	   					"data": {
	   						"original_img": "http://image4.youjiagou.com/images/s-20170303/55/c7db242a6dd8f9e5cfa73e0e3f2f7cd3.jpeg?zjyp=1",
	   						"goods_name": "带抽储物设计 圆润光滑拉手 现代风格茶几 ",
	   						"price": "999.00",
	   						"goods_id": "15985",
	   						"attr": [{
	   							"attrValue": "白色",
	   							"attrName": "颜色"
	   						}]
	   					},
	   					"type": "1"
	   				},
	   				"orderId": "2018062716101400322",
	   				"orderItem": {
	   					"id": "2018062716101500323",
	   					"itemId": "15985",
	   					"num": 2,
	   					"orderId": "2018062716101400322",
	   					"type": "1"
	   				},
	   				"orderShipping": {
	   					"created": 1530087015000,
	   					"orderId": "2018062716101400319",
	   					"receiverAddress": "11",
	   					"receiverCity": "鄂尔多斯市",
	   					"receiverDistrict": "内蒙古自治区",
	   					"receiverMobile": "13025652356",
	   					"receiverName": "11",
	   					"receiverPhone": null,
	   					"receiverState": "鄂托克前旗",
	   					"receiverZip": null,
	   					"updated": 1530087015000
	   				},
	   				"parentOrderId": null,
	   				"payment": "1998.0",
	   				"paymentTime": null,
	   				"paymentType": null,
	   				"postFee": null,
	   				"refundStatus": 0,
	   				"shippingCode": null,
	   				"shippingName": null,
	   				"status": 1,
	   				"updateTime": 1530087014000,
	   				"userId": "2018060710325300135"
	   			}],
	   			"createTime": 1530087014000,
	   			"parentOrderId": "2018062716101400319",
	   			"payMent": "6828.0",
	   			"status": 1
	   		}],
	   		"pageIndex": 1,
	   		"totalPages": 1,
	   		"pageSize": 10
	   	},
	   	"msg": "OK",
	   	"status": 200
	   }
	   this.orderList = result.data.data;
	   		setTimeout(function() {
	   	for(var i = 0; i < $('.orderBox').length; i++) {
	   		$('.rCont').eq(i).css({
	   			'height': $('.lConts').eq(i).height() + 'px'
	   		});
	   	};
	   			// 订单状态非1
	   	for(var j = 0; j < $('.orderBoxWrap .goodsLine').length; j++) {
	   		$('.orderSuccWrap .totalPrice').eq(j).css({
	   			'height': $('.goodsLine').eq(j).height() + 'px'
	   		});
	   		$('.orderSuccWrap .status').eq(j).css({
	   			'height': $('.goodsLine').eq(j).height() + 'px'
	   		});
	   	}
	   }, 1000);
	   		// 翻页器
	   $('.paging').pagination({
	   	pageCount: result.data.data.totalPages,
	   	coping: true,
	   	mode: 'fixed',
	   	activeCls: 'activeCls',
	   	homePage: '首页',
	   	endPage: '尾页',
	   	prevContent: '<img src="./images/prevPage.png"/>',
	   	nextContent: '<img src="./images/nextPage.png"/>',
	   	callback: function(api) {
	   		loginWrap.pageNum = api.getCurrent();
	   				loginWrap.$http.post('http://localhost:8083/zujahome-main/order/showOrderList', {
	   			pageNum: loginWrap.pageNum,
	   			status: status
	   		}, { // 没有参数也要放空的大括号
	   			headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
	   				'Content-Type': 'application/x-www-form-urlencoded'
	   			},
	   			emulateJSON: true
	   		}).then(function(data) {
	   			loginWrap.orderList = data.body.data.data;
	   					setTimeout(function() {
	   				for(var i = 0; i < $('.orderBox').length; i++) {
	   					$('.rCont').eq(i).css({
	   						'height': $('.lConts').eq(i).height() + 'px'
	   					});
	   				};
	   			}, 1000);
	   		}, function(a) {
	   			console.log('请求错误 ')
	   		});
	   	}
	   });*/
			},
			orderDetailFn: function orderDetailFn(id) {
				// 订单详情
				window.location.href = 'orderDetail.html?oid=' + id;
			},
			openCancleBox: function openCancleBox(id) {
				// 打开取消订单窗口
				this.cancleBox = true;
	
				this.cancelOrderId = id;
	
				setTimeout(function () {
					// 遮罩层默认样式
					$('.mask').css({
						'width': $(document).width() + 'px',
						'height': document.body.scrollHeight + 'px'
					});
	
					$('.cancleOrderAlert li').on('click', function () {
						$('.cancleOrderAlert li').css({
							'border': '0.066666rem solid #E6E6E6'
						});
						$(this).css({
							'border': '0.066666rem solid #cd2f1d'
						});
	
						// 取消原因
						loginWrap.cancleResult = $(this).text();
					});
				}, 10);
			},
			cancleOrderClick: function cancleOrderClick() {
				// 取消订单
				if (this.cancleResult == '') {
					// 未选择提交理由
					alert('请选择取消订单原因');
				} else {
					this.cancleBox = false;
					this.$http.post('http://localhost:8083/zujahome-main/order/cancelOrder', {
						orderId: this.cancelOrderId,
						cancelReason: this.cancleResult
					}, { // 没有参数也要放空的大括号
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						if (data.body.status == '200') {
							this.cancleSuccBox = true;
	
							setTimeout(function () {
								// 遮罩层默认样式
								$('.mask').css({
									'width': $(document).width() + 'px',
									'height': document.body.scrollHeight + 'px'
								});
							}, 10);
						} else {
							alert(data.body.msg);
						}
					}, function (a) {
						console.log('请求错误 ');
					});
				}
			},
			delBoxClick: function delBoxClick(val, type) {
				// 删除订单
				this.delBox = val;
	
				setTimeout(function () {
					// 遮罩层默认样式
					$('.mask').css({
						'width': $(document).width() + 'px',
						'height': document.body.scrollHeight + 'px'
					});
				}, 10);
	
				if (type == '1') {
					// 确定
					this.$http.post('http://localhost:8083/zujahome-main/order/delOrder', {
						orderId: this.delOrderId
					}, { // 没有参数也要放空的大括号
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						if (data.body.status == '200') {
							window.location.reload();
						} else {
							alert(data.body.msg);
						}
					}, function (a) {
						console.log('请求错误 ');
					});
				};
			},
			delBoxAlert: function delBoxAlert(val, orderId) {
				// 删除订单
				this.delBox = true;
				this.delOrderId = orderId;
	
				// 遮罩层默认样式
				setTimeout(function () {
					$('.mask').css({
						'width': $(document).width() + 'px',
						'height': document.body.scrollHeight + 'px'
					});
				}, 10);
			},
			cancleSuccBoxClick: function cancleSuccBoxClick(val) {
				// 取消订单成功弹框
				this.cancleSuccBox = val;
	
				window.location.reload();
			},
			againShopping: function againShopping(e) {
				// 再次购买
				alert($(e.target));
				for (var i = 0; i < $(e.target).parent().parent().parent().find('.lCont').length; i++) {
					this.checkGoodsPic.push({
						itemId: $(e.target).parent().parent().parent().find('.lCont').eq(i).data('itemid'),
						num: $(e.target).parent().parent().parent().find('.lCont').eq(i).data('num'),
						type: $(e.target).parent().parent().parent().find('.lCont').eq(i).data('type')
					});
				};
	
				for (var j = 0; j < this.checkGoodsPic.length; j++) {
					this.itemIdAndNum.push(this.checkGoodsPic[j].itemId + '_' + this.checkGoodsPic[j].num + '_' + this.checkGoodsPic[j].type);
				}
	
				window.location.href = 'jsy.html?orderlist=' + this.itemIdAndNum.join(',');
			},
			paymentFn: function paymentFn(id) {
				// 付款
				this.$http.post('http://localhost:8083/zujahome-main/order/settleAccount', {
					orderId: id
				}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					console.log(data.body);
				}, function (a) {
					console.log('请求错误 ');
				});
			},
			confirmReceipt: function confirmReceipt(id) {
				// 确认收货
				this.$http.post('http://localhost:8083/zujahome-main/order/confirmReceipt', {
					orderId: id
				}, {
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					this.hotGoodsCat = data.body.data; // 热门商品
	
					this.showHotGoods(this.hotGoodsCat[0].id); // 请求热卖商品列表，默认请求第一个热卖商品推荐
				}, function (a) {
					console.log('请求错误 ');
				});
			},
			toGoodsDetail: function toGoodsDetail(id) {
				// 跳转到商品详情页面
				window.location.href = 'spxq.html?goodsId=' + id;
			},
			orderStatusClick: function orderStatusClick(val) {
				if (val == 1) {
					// 全部订单
					this.allOrder = true;
					this.waitPay = false;
					this.alreadyPay = false;
					this.waitTakeGoods = false;
					this.waitAssess = false;
					this.cancelSuccess = false;
	
					this.showOrderList(''); // 展示订单列表
				} else if (val == 2) {
						// 待付款
						this.allOrder = false;
						this.waitPay = true;
						this.alreadyPay = false;
						this.waitTakeGoods = false;
						this.waitAssess = false;
						this.cancelSuccess = false;
	
						this.showOrderList('1'); // 展示订单列表
					} else if (val == 3) {
							// 待发货
							this.allOrder = false;
							this.waitPay = false;
							this.alreadyPay = true;
							this.waitTakeGoods = false;
							this.waitAssess = false;
							this.cancelSuccess = false;
	
							this.showOrderList('2'); // 展示订单列表
						} else if (val == 4) {
								// 待收货
								this.allOrder = false;
								this.waitPay = false;
								this.alreadyPay = false;
								this.waitTakeGoods = true;
								this.waitAssess = false;
								this.cancelSuccess = false;
	
								this.showOrderList('3'); // 展示订单列表
							} else if (val == 5) {
									// 已收货
									this.allOrder = false;
									this.waitPay = false;
									this.alreadyPay = false;
									this.waitTakeGoods = false;
									this.waitAssess = true;
									this.cancelSuccess = false;
	
									this.showOrderList('4'); // 展示订单列表
								} else if (val == 6) {
										// 已收货
										this.allOrder = false;
										this.waitPay = false;
										this.alreadyPay = false;
										this.waitTakeGoods = false;
										this.waitAssess = false;
										this.cancelSuccess = true;
	
										this.showOrderList('5'); // 展示订单列表
									}
			},
			maskClick: function maskClick() {
				// 点击遮罩层
				this.cancleBox = false;
				this.delBox = false;
				this.cancleBox = false;
			}
		}
	});
	
	$(function () {
		// 设置翻页距左边距离
		$('.pagingWrap .paging').css({
			'margin-left': ($('.pagingWrap').width() - $('.pagingWrap .paging').width()) / 2 + 'px'
		});
	});

/***/ })
/******/ ]);
//# sourceMappingURL=personCenter.js.map