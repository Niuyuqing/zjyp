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

	// 购物车
	'use strict';
	
	var shoppingCartMain = new Vue({
		el: '.shoppingCartMain',
		data: {
			goodsSelect: false,
			openOrTakeup: false, // 展开
			shoppingCartData: [], // 购物车列表
			showAllPic: false, // 是否显示所有图片缩略图
			checkGoodsMoney: 0, // 选中商品总价钱
			saveMoney: 0, // 节省
			checkGoodsPic: [], // 选中商品的图片
			checkedNum: 0, // 选中商品数量
			delBox: false, // 删除商品提示框
			delItemId: [], // 删除商品itemID
			itemIdAndNum: [] },
		// itemId和数量，给结算页用
		mounted: function mounted() {
			this.cartList(); // 查询购物车列表接口
		},
		methods: {
			cartList: function cartList() {
				// 查询购物车列表接口
				this.$http.post('http://localhost:8083/zujahome-main/cart/cartList', {}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					this.shoppingCartData = data.body.data;
					console.log(this.shoppingCartData);
				}, function (a) {
					console.log('请求错误 ');
				});
	
				/*var result = {
	   	"data": [{
	   		"itemId": "18821",
	   		"itemNum": 1,
	   		"type": 1,
	   		"data": {
	   			"original_img": "http://image.youjiagou.com/images/s-20160908/5/efedda7d471332ee15dfecbdddd145ba.jpeg",
	   			"goods_name": "高档现代简约风格加密加厚几何图案地毯1600mm*2300mm",
	   			"price": "1650.00",
	   			"goods_id": "18821",
	   			"attr": [{
	   				"attrValue": "1600*2300mm",
	   				"attrName": "类型"
	   			}]
	   		},
	   	}, {
	   		"itemId": "16003",
	   		"itemNum": 1,
	   		"data": {
	   			"original_img": "http://image.youjiagou.com/images/s-20160721/87/3ccb72927732d24ad191c1e018638bb8.jpeg",
	   			"goods_name": "新风尚日韩风格现代简约地毯",
	   			"price": "1630.00",
	   			"goods_id": "16003",
	   			"attr": []
	   		},
	   		"type": 1
	   	}],
	   	"msg": "OK",
	   	"status": 200
	   }
	   this.shoppingCartData = result.data;*/
			},
			selectGoods: function selectGoods(e, money, itemId, picUrl, num, type) {
				// 单选
				var aa = $(e.target).prop('src');
				if (aa.substr(aa.length - 5, 1) == '2' || aa.substr(aa.length - 5, 1) == 2) {
					// 选中状态
					this.checkedNum -= 1; // 选中商品-1
	
					$(e.target).prop('src', 'images/select_1.png');
					this.checkGoodsMoney -= parseInt(money);
	
					// 展开已选商品图片，删除已选
					for (var s = 0; s < this.checkGoodsPic.length; s++) {
						if (this.checkGoodsPic[s].itemId == itemId) {
							this.checkGoodsPic.splice(s, 1);
						};
					};
	
					// 要删除商品itemID
					for (var b = 0; b < this.delItemId.length; b++) {
						if (this.delItemId[b] == itemId) {
							this.delItemId.splice(b, 1);
						}
					};
					console.log(this.delItemId);
	
					// 取消全选的选中
					$('.goodsAllSelect').prop('src', 'images/select_1.png');
				} else if (aa.substr(aa.length - 5, 1) == '1' || aa.substr(aa.length - 5, 1) == 1) {
					$(e.target).prop('src', 'images/select_2.png');
					this.checkedNum += 1;
					this.checkGoodsMoney += parseInt(money);
					// 展开已选商品图片
					this.checkGoodsPic.push({
						itemId: itemId,
						picUrl: picUrl,
						num: num,
						type: type
					});
	
					this.delItemId.push(itemId); // 删除商品itemID
	
					// 判断单选是否全部选中
					if (this.checkedNum == this.shoppingCartData.length) {
						$('.goodsAllSelect').prop('src', 'images/select_2.png');
					};
	
					// 设置已选商品的展示宽度
					this.setCheckGoodsWidth();
				}
			},
			selectAll: function selectAll() {
				// 全选
				this.goodsSelect = !this.goodsSelect;
				this.checkedNum = this.shoppingCartData.length;
				if (this.goodsSelect) {
					// 全选
					$('.shoppingCartMain .goodsSelect').prop('src', 'images/select_2.png');
					this.checkGoodsPic = [];
	
					// 计算总价
					for (var i = 0; i < this.shoppingCartData.length; i++) {
						this.checkGoodsMoney += this.shoppingCartData[i].itemNum * this.shoppingCartData[i].data.price;
					};
	
					// 已选图片
					for (var p = 0; p < this.shoppingCartData.length; p++) {
						this.checkGoodsPic.push({
							itemId: this.shoppingCartData[p].itemId,
							picUrl: this.shoppingCartData[p].data.original_img,
							num: this.shoppingCartData[p].itemNum,
							type: this.shoppingCartData[p].type
						});
	
						// 选中商品itemID
						this.delItemId.push(this.shoppingCartData[p].itemId);
					};
	
					// 设置已选商品的展示宽度
					this.setCheckGoodsWidth();
				} else {
					$('.shoppingCartMain .goodsSelect').prop('src', 'images/select_1.png');
	
					// 总价清零
					this.checkGoodsMoney = 0;
	
					this.checkedNum = 0;
	
					this.checkGoodsPic = [];
	
					this.delItemId = [];
				}
			},
			limitShoppingNum: function limitShoppingNum(e, id, goodsType) {
				// 限制购买数量只能输入数字
				$(e.target).val($(e.target).val().replace(/\D/g, ''));
	
				setTimeout(function () {
					// 修改商品数量接口
					shoppingCartMain.changeGoodsNum(id, $(e.target).val(), goodsType);
				}, 100);
			},
			changeShoppingNum: function changeShoppingNum(e, type, id, goodsType) {
				// 修改购买数量
				var goodsNums = parseInt($(e.target).parent().parent().find('.goodsNum').val());
				if (type == 1) {
					// 减
					if (goodsNums > 0) {
						goodsNums = goodsNums - 1;
						$(e.target).parent().parent().find('.goodsNum').val(goodsNums);
					}
				} else {
					// 加
					goodsNums = goodsNums + 1;
					$(e.target).parent().parent().find('.goodsNum').val(goodsNums);
				}
	
				// 修改商品数量接口
				this.changeGoodsNum(id, goodsNums, goodsType);
			},
			changeGoodsNum: function changeGoodsNum(id, goodsNums, goodsType) {
				// 修改商品数量接口
				this.$http.post('http://localhost:8083/zujahome-main/cart/update/num', {
					itemId: id,
					num: goodsNums,
					type: goodsType
				}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					console.log(data.body);
					if (data.body.status == '200') {
						this.cartList(); // 查询购物车列表接口
					}
				}, function (a) {
					console.log('请求错误 ');
				});
			},
			getDelItemId: function getDelItemId(id) {
				// 获取删除商品itemId
				this.delItemId = []; // 先清空
				this.delItemId.push(id);
				this.delBox = true;
	
				console.log(this.delItemId);
	
				this.setMaskSize(); // 设置遮罩层大小
			},
			delAllGoods: function delAllGoods() {
				// 删除多个商品点击
				this.delBox = true;
				this.setMaskSize(); // 设置遮罩层大小
			},
			delCurrentGoods: function delCurrentGoods(type) {
				// 单品删除
				console.log(this.delItemId);
				if (type == '1') {
					// 点击确定按钮
					this.$http.post('http://localhost:8083/zujahome-main/cart/deleteItem', {
						itemIdStrs: this.delItemId.join(','),
						type: '1'
					}, { // 没有参数也要放空的大括号
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						if (data.body.status == '200') {
							this.cartList();
						} else {
							alert(data.body.msg);
						}
					}, function (a) {
						console.log('请求错误 ');
					});
				};
				this.delBox = false;
			},
			openOrTakeupFn: function openOrTakeupFn() {
				// 展开收起
				this.openOrTakeup = !this.openOrTakeup;
	
				if (this.openOrTakeup) {
					this.setCheckGoodsWidth(); // 设置已选商品的展示宽度
				};
			},
			// 设置已选商品的展示宽度
			setCheckGoodsWidth: function setCheckGoodsWidth() {
				setTimeout(function () {
					$('.goodsAllPic ul').css({
						'width': 100 / 15 * (shoppingCartMain.checkedNum + 1) + 'rem'
					});
				}, 100);
			},
			setMaskSize: function setMaskSize() {
				// 设置遮罩层大小
				setTimeout(function () {
					// 遮罩层默认样式
					$('.mask').css({
						'width': $(document).width() + 'px',
						'height': document.body.scrollHeight + 'px'
					});
				}, 100);
			},
			// 查看已选商品图片左右翻动
			seeGoodsPic: function seeGoodsPic(type) {
				if ($('.goodsAllPic ul').width() > $('.picWrap').width()) {
					// 宽度大于外层点击才会左右滑动
					if (type == '1') {
						// 左
						if (-parseFloat($('.goodsAllPic ul').css('left')) <= 0) {
							// 左边界
							$('.goodsAllPic ul').css({
								'left': 0
							});
						} else {
							$('.goodsAllPic ul').css({
								'left': parseFloat($('.goodsAllPic ul').css('left')) / 15 + 80 / 15 + 'rem'
							});
						}
					} else if (type == '2') {
						// 右
						if (-parseFloat($('.goodsAllPic ul').css('left')) >= $('.goodsAllPic ul').width() - $('.goodsAllPic .picWrap').width()) {
							// 右边界
							$('.goodsAllPic ul').css({
								'left': -($('.goodsAllPic ul').width() - $('.goodsAllPic .picWrap').width()) + 'px'
							});
						} else {
							$('.goodsAllPic ul').css({
								'left': parseFloat($('.goodsAllPic ul').css('left')) / 15 - 80 / 15 + 'rem'
							});
						}
					};
				}
			},
			toGoodsBalance: function toGoodsBalance() {
				// 点击结算
				for (var i = 0; i < this.checkGoodsPic.length; i++) {
					this.itemIdAndNum.push(this.checkGoodsPic[i].itemId + '_' + this.checkGoodsPic[i].num + '_' + this.checkGoodsPic[i].type);
				}
				window.location.href = 'jsy.html?orderlist=' + this.itemIdAndNum.join(',');
			},
			toGoodsDetail: function toGoodsDetail(id) {
				// 跳转商品详情页面
				window.open('spxq.html?goodsId=' + id);
			}
		}
	});

/***/ })
/******/ ]);
//# sourceMappingURL=shoppingCart.js.map