// 购物车
var shoppingCartMain = new Vue({
	el: '.shoppingCartMain',
	data: {
		goodsSelect: false,
		openOrTakeup: true, // 展开
		shoppingCartData: [], // 购物车列表
		showAllPic : false,  // 是否显示所有图片缩略图
	},
	mounted: function() {
		// 添加购物车接口
		/*this.$http.post('http://localhost:8083/zujahome-main/cart/cartList', {}, { // 没有参数也要放空的大括号
			headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			emulateJSON: true
		}).then(function(data) {
			var result = {
				"data": [{
					"itemId": "83013",
					"itemNum": 3,
					"data": "{\"original_img\":\"http://image.youjiagou.com/images/s-20180131/14/e999ec66046b50ed99525b114163da56.jpeg\",\"goods_name\":\"Freeing/菲俪全屋定制 田园地中海卧室成套家具 环保板材衣柜书柜床头柜（定金）\",\"goods_id\":\"83013\",\"attr\":[{\"attrValue\":\"定金\",\"attrName\":\"类型\"},{\"attrValue\":\"否\",\"attrName\":\"可选材质\"}]}",
					"type": null
				}, {
					"itemId": "95964",
					"itemNum": 1,
					"data": "{\"original_img\":\"http://image.youjiagou.com/images/s-20180508/72/024f4a8f3af6eed4adc3d63edf4735ab.jpeg\",\"goods_name\":\"源木E族(千禧一代)木门-高端水染木皮-橡木直纹深灰 E-M813木门 套外径2300*900*300\",\"goods_id\":\"95964\",\"attr\":[{\"attrValue\":\"橡木直纹深灰\",\"attrName\":\"颜色\"},{\"attrValue\":\"实木\",\"attrName\":\"基材\"}]}",
					"type": null
				}],
				"msg": "OK",
				"status": 200
			};
			//this.shoppingCartData = data.body.data;

			this.shoppingCartData = result.data;

			console.log(this.shoppingCartData);

			for(var i = 0; i < this.shoppingCartData.length; i++) {
				//console.log(JSON.parse(this.shoppingCartData[i].data));
				//console.log(JSON.parse(JSON.parse(this.shoppingCartData[i].data).group_attr_info).attr_info);   // 商品属性

				this.attrInfo.push(JSON.parse(JSON.parse(this.shoppingCartData[i].data).group_attr_info).attr_info);
			}

			// 商品属性
			for(var y = 0; y < this.attrInfo.length; y++) {
				this.newAttrInfo.push(this.attrInfo[y]);
			}
		}, function(a) {
			console.log('请求错误 ');
		});*/

		var result = {
			"data": [{
				"itemId": "83013",
				"itemNum": 3,
				"data": {
					"original_img": "http://image.youjiagou.com/images/s-20180131/14/e999ec66046b50ed99525b114163da56.jpeg",
					"goods_name": "Freeing/菲俪全屋定制 田园地中海卧室成套家具 环保板材衣柜书柜床头柜（定金）",
					"shop_price_1": "500.00",
					"goods_id": "83013",
					"attr": [{
						"attrValue": "定金",
						"attrName": "类型"
					}, {
						"attrValue": "否",
						"attrName": "可选材质"
					}]
				},
				"type": null
			}, {
				"itemId": "95964",
				"itemNum": 1,
				"data": {
					"original_img": "http://image.youjiagou.com/images/s-20180508/72/024f4a8f3af6eed4adc3d63edf4735ab.jpeg",
					"goods_name": "源木E族(千禧一代)木门-高端水染木皮-橡木直纹深灰 E-M813木门 套外径2300*900*300",
					"shop_price_1": "2330.00",
					"goods_id": "95964",
					"attr": [{
						"attrValue": "橡木直纹深灰",
						"attrName": "颜色"
					}, {
						"attrValue": "实木",
						"attrName": "基材"
					}]
				},
				"type": null
			}],
			"msg": "OK",
			"status": 200
		}
		this.shoppingCartData = result.data;
		
		console.log(this.shoppingCartData)
	},
	methods: {
		selectGoods: function(e) { // 单选
			var aa = $(e.target).prop('src');
			if(aa.substr(aa.length - 5, 1) == '2' || aa.substr(aa.length - 5, 1) == 2) {
				$(e.target).prop('src', 'images/select_1.png');
			} else if(aa.substr(aa.length - 5, 1) == '1' || aa.substr(aa.length - 5, 1) == 1) {
				$(e.target).prop('src', 'images/select_2.png');
			}

			// 判断是否全选
			for(var i = 0; i < $('.goodsSingleSelect').length; i++) {
				if($('.goodsSingleSelect').eq(i).prop('src').substr(aa.length - 5, 1) == '2' || aa.substr(aa.length - 5, 1) == 2) {
					$('.goodsAllSelect').prop('src', 'images/select_2.png');
				} else {
					$('.goodsAllSelect').prop('src', 'images/select_1.png');
				}
			}
		},
		selectAll: function() { // 全选
			this.goodsSelect = !this.goodsSelect;
			if(this.goodsSelect) {
				$('.shoppingCartMain .goodsSelect').prop('src', 'images/select_2.png');
			} else {
				$('.shoppingCartMain .goodsSelect').prop('src', 'images/select_1.png');
			}
		},
		limitShoppingNum: function(e) { // 限制购买数量只能输入数字
			$(e.target).val($(e.target).val().replace(/\D/g, ''));
		},
		changeShoppingNum: function(e, type) { // 修改购买数量
			var goodsNums = parseInt($(e.target).parent().find('.goodsNum').val());
			if(type == 1) { // 减
				if(goodsNums > 0) {
					goodsNums = goodsNums - 1;
					$(e.target).parent().find('.goodsNum').val(goodsNums);
				}
			} else { // 加
				goodsNums = goodsNums + 1;
				$(e.target).parent().find('.goodsNum').val(goodsNums);
			}
		},
		openOrTakeupFn: function() { // 展开收起
			this.openOrTakeup = !this.openOrTakeup;
		}
	}
});