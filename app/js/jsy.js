// 结算页
var jsyMain = new Vue({
	el: '.jsyMain',
	data: {
		delBox: false, // 默认不显示删除弹框和灰色遮罩层
		addBox: false, // 默认不显示新增收货地址弹框
		editBox: false, // 编辑收货地址弹框
		unfoldAddress: false, // 收起/展开地址
		weChatPay: true, // 微信支付
		alipayPay: false, // 支付宝支付
		payWay : 1,  // 支付方式
		receiveRegion: '', // 区域
		receiveName: '', // 姓名
		receivePhone: '', // 电话
		receiveAddress: '', // 地址
		province: '', // 省
		city: '', // 市
		area: '', // 区
		phoneErrorTip: true, // 电话填写错误提示
		userReceiveInfoList: [], // 收货人地址
		threeUserReceiveInfoList: [], // 前三条收货地址
		orderList: [], // 订单内容，从地址栏获取
		orderList2: [], // 订单数组，中转使用
		orderListObj: [], // 订单内容，作为参数传递
		orderDataList: [], // 订单接口数据
		totalGoodsNum: 0, // 商品总数量
		totalMoney: 0, // 总金额
		receivingAddress: '', // 收货地址
		addressee: '', // 收件人
		addresseePhone: '', // 收件人电话
		userReceiveInfoId: '', // 收货地址ID

		// 点击编辑按钮的收货地址数据
		editId: '',
		editName: '',
		editAddress: '',
		editPhone: '',
		editProvince: '',
		editCity: '',
		editArea: '',
		editRegion: '',
		delAddressId: '', // 删除收货地址ID
	},
	mounted: function() {
		this.showUserReceiveInfoList(); // 展示收货地址列表

		this.orderList = this.getUrlParam('orderlist').split(','); // 订单列表
		
		// 转换订单内容
		if (this.orderList!='') {
			for(var i = 0; i < this.orderList.length; i++) {
				this.orderList2.push(this.orderList[i].split('_'));
				this.orderListObj.push({
					'itemId': this.orderList2[i][0],
					'num': this.orderList2[i][1],
					'type': this.orderList2[i][2]
				});
			};
		}
		
		// 订单下添加的购物车列表
		this.$http.post('http://localhost:8083/zujahome-main/order/orderCartList', {
			cartItemList: JSON.stringify(this.orderListObj)
		}, { // 没有参数也要放空的大括号
			headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			emulateJSON: true
		}).then(function(data) {
			this.orderDataList = data.body.data;

			setTimeout(function() {
				// 计算总价格
				for(var i = 0; i < jsyMain.orderDataList.length; i++) {
					jsyMain.totalMoney += parseInt(jsyMain.orderDataList[i].itemNum) * parseFloat(jsyMain.orderDataList[i].data.price);
					jsyMain.totalGoodsNum += parseInt(jsyMain.orderDataList[i].itemNum);
				};
			}, 100);
		}, function(a) {
			console.log('请求错误 ')
		});

		/*var result = {
			"data": [{
				"itemId": "18821",
				"itemNum": 1,
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
				"type": null
			},{
				"itemId": "31172",
				"itemNum": 4,
				"data": {
					"original_img": "http://image.youjiagou.com/images/s-20170414/69/f27118509464ccf33a1f570d785a0c53.jpeg",
					"goods_name": "荣纳卫浴 扇形铝合金隔断 家用简易淋浴房 单移门带旋转置物架",
					"price": "2166.00",
					"goods_id": "31172",
					"attr": [{
						"attrValue": "6mm",
						"attrName": "玻璃厚度"
					}, {
						"attrValue": "800*1200*1850mm",
						"attrName": "类型"
					}]
				},
				"type": null
			}],
			"msg": "OK",
			"status": 200
		}
		this.orderDataList = result.data;
		
		setTimeout(function () {
			// 计算总价格
			for(var i = 0; i < jsyMain.orderDataList.length; i++) {
				jsyMain.totalMoney += parseInt(jsyMain.orderDataList[i].itemNum) * parseFloat(jsyMain.orderDataList[i].data.price);
				jsyMain.totalGoodsNum += parseInt(jsyMain.orderDataList[i].itemNum);
			};
		},100);*/
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
		checkPhone: function(val) { // 验证手机号
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			return reg.test(val);
		},
		choseReceivingAddr: function(e, i, region, address, name, phone, infoId) { // 选中收货地址
			$(e.target).parent().parent().parent().parent().find('.mask2').hide();
			$('.consigneeWrap').find('.mask2').eq(i).show();

			this.receivingAddress = this.userReceiveInfoList[i].receive_region.replace(/,/g, '') + this.userReceiveInfoList[i].receive_address;
			this.addressee = this.userReceiveInfoList[i].receive_name;
			this.addresseePhone = this.userReceiveInfoList[i].receive_phone;
			this.userReceiveInfoId = this.userReceiveInfoList[i].id;
		},
		delConsigneeMsg: function(val, id) { // 删除收货人信息
			this.delBox = true;
			// 一定是在为true的时候设置遮罩层高度，如果在页面进入设置高度，是无效的，因为还没有创建这个元素
			setTimeout(function() {
				$('.frameMask').css({
					width: $(window).width() + 'px',
					height: document.body.scrollHeight + 'px'
				});
			}, 100);
			this.delAddressId = id;
		},
		confirmDelCollectGoods: function(type) { // 确认删除收货地址
			this.delBox = false;
			if(type == '1') { // 确定删除
				this.$http.post('http://localhost:8083/zujahome-main/user/delUserReceiveInfo', {
					infoId: this.delAddressId
				}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function(data) {
					if(data.body.status == '200') {
						window.location.reload();
					} else {
						alert(data.body.msg);
					}
				}, function(a) {
					console.log('请求错误 ')
				});
			}
		},
		/**
		 * 添加收货人信息
		 * @param {Object} val
		 * @param {Object} type  1 新增    2 点击关闭按钮   3 保存收货地址
		 */
		addConsigneeMsg: function(val, type, saveORedit) {
			if(type == '1') {
				this.addBox = val;

				// 清空上次填写地址内容
				this.receiveName = '';
				this.receivePhone = '';
				this.receiveAddress = '';

				// 一定是在为true的时候设置遮罩层高度，如果在页面进入设置高度，是无效的，因为还没有创建这个元素
				setTimeout(function() {
					$('.frameMask').css({
						width: $(window).width() + 'px',
						height: document.body.scrollHeight + 'px'
					});

					// 省市区要放在定时器里面初始化，因为默认是没有这个元素的
					$('#distpicker4').distpicker({
						province: '请选择',
						city: '请选择',
						district: '请选择',
						autoSelect: false
					});
				}, 100);
			} else if(type == '2') {
				this.addBox = val;
			} else if(type == '3') { // 点击保存收货地址按钮
				this.phoneErrorTip = this.checkPhone(this.receivePhone);
				if(this.phoneErrorTip) {
					this.addBox = val;

					// 区域拼接
					this.receiveRegion = this.province + ',' + this.city + ',' + this.area;
					this.$http.post('http://localhost:8083/zujahome-main/user/addUserReceiveInfo', {
						receiveRegion: this.receiveRegion, // 区域
						receiveName: this.receiveName, // 姓名
						receivePhone: this.receivePhone, // 电话
						receiveAddress: this.receiveAddress, // 地址
						isDefault: 0 // 默认值
					}, { // 没有参数也要放空的大括号
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function(data) {
						if(data.body.status == '200') {
							window.location.reload();
						} else {
							alert(data.body.msg);
						}
					}, function(a) {
						console.log('请求错误 ')
					});
				} else {
					this.addBox = true;
				}
			}
		},
		editCollectGoods: function(id, name, region, addr, phone) { // 点击收货地址编辑
			this.editBox = true;

			var arr = region.split(',');
			this.editRegion = region;
			this.editId = id;
			this.editName = name;
			this.editAddress = addr;
			this.editPhone = phone;
			this.editProvince = arr[0];
			this.editCity = arr[1];
			if(arr[2]) {
				this.editArea = arr[2];
			};

			// 一定是在为true的时候设置遮罩层高度，如果在页面进入设置高度，是无效的，因为还没有创建这个元素
			setTimeout(function() {
				$('.frameMask').css({
					width: $(window).width() + 'px',
					height: document.body.scrollHeight + 'px'
				});

				// 省市区要放在定时器里面初始化，因为默认是没有这个元素的
				$('#distpicker5').distpicker({
					province: jsyMain.editProvince,
					city: jsyMain.editCity,
					district: jsyMain.editArea,
					autoSelect: false
				});
			}, 10);

			console.log(this.editProvince + ',' + this.editCity + ',' + this.editArea)
		},
		editConsigneeMsg: function(val, type) { // 编辑收货人信息
			if(type == '2') {
				this.editBox = val;
			} else if(type == '3') { // 点击保存收货地址按钮
				this.phoneErrorTip = this.checkPhone(this.editPhone);
				if(this.phoneErrorTip) {
					this.editBox = val;

					// 区域拼接
					this.editRegion = this.editProvince + ',' + this.editCity + ',' + this.editArea;
					this.$http.post('http://localhost:8083/zujahome-main/user/updateUserReceiveInfo', {
						id: this.editId,
						receiveRegion: this.editRegion,
						receiveName: this.editName,
						receivePhone: this.editPhone,
						receiveAddress: this.editAddress
					}, { // 没有参数也要放空的大括号
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function(data) {
						if(data.body.status == '200') {
							window.location.reload();
						} else {
							alert(data.body.msg);
						}
					}, function(a) {
						console.log('请求错误 ')
					});
				} else {
					this.editBox = true;
				}
			}
		},
		unfoldAddressClick: function() { // 收起/展开地址
			this.unfoldAddress = !this.unfoldAddress;
			
			if(this.unfoldAddress){
				// 鼠标移入移出收货地址
				setTimeout(function() {
					$('.consigneeMsg').on({
						'mouseenter': function() {
							$(this).find('.mask').show();
							$(this).find($('.setDefAddress,.edit,.del')).show();
						},
						'mouseleave': function() {
							$(this).find('.mask').hide();
							$(this).find($('.setDefAddress,.edit,.del')).hide();
						}
					});
				}, 100);
			}
		},
		payWayClick: function(type) { // 点击微信支付
			if(type == '1') { // 微信支付
				this.weChatPay = true;
				this.alipayPay = false;
				this.payWay = 1;
			} else if(type == '2') { // 支付宝支付
				this.weChatPay = false;
				this.alipayPay = true;
				this.payWay = 2;
			}

		},
		showUserReceiveInfoList: function() { // 展示收货地址列表
			this.$http.post('http://localhost:8083/zujahome-main/user/showUserReceiveInfoList', {}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				this.userReceiveInfoList = data.body.data;

				for(var i = 0; i < this.userReceiveInfoList.length; i++) {
					if(this.userReceiveInfoList[i].is_default == '1') { // 默认收货地址
						this.receivingAddress = this.userReceiveInfoList[i].receive_region.replace(/,/g, '') + this.userReceiveInfoList[i].receive_address;
						this.addressee = this.userReceiveInfoList[i].receive_name;
						this.addresseePhone = this.userReceiveInfoList[i].receive_phone;
						this.userReceiveInfoId = this.userReceiveInfoList[i].id;
					}
				}

				for(var j = 0; j < this.userReceiveInfoList.length; j++) {
					if (!(j >= 3)) {
						this.threeUserReceiveInfoList.push(this.userReceiveInfoList[j]);
					}
				}
				
				// 鼠标移入移出收货地址
				setTimeout(function() {
					$('.consigneeMsg').on({
						'mouseenter': function() {
							$(this).find('.mask').show();
							$(this).find($('.setDefAddress,.edit,.del')).show();
						},
						'mouseleave': function() {
							$(this).find('.mask').hide();
							$(this).find($('.setDefAddress,.edit,.del')).hide();
						}
					});
				}, 100);
			}, function(a) {
				console.log('请求错误 ')
			});

			/*var result = {
				"data": [{
					"created": 1527133316000,
					"id": 1,
					"isDefault": 0,
					"receiveAddress": "沙窝北路19号润丰集团西门",
					"receiveName": "牛雨晴",
					"receivePhone": "18001250752",
					"receiveRegion": "北京市,北京市市辖区,朝阳区",
					"updated": 1527133316000,
					"userId": 10
				}, {
					"created": 1527133439000,
					"id": 2,
					"isDefault": 1,
					"receiveAddress": "燕郊燕京航城",
					"receiveName": "牛雨晴",
					"receivePhone": "18001250752",
					"receiveRegion": "河北省,廊坊市,三河市",
					"updated": 1527133439000,
					"userId": 10
				}, {
					"created": 1527133439000,
					"id": 2,
					"isDefault": 1,
					"receiveAddress": "燕郊燕京航城",
					"receiveName": "牛雨晴",
					"receivePhone": "18001250752",
					"receiveRegion": "河北省,廊坊市,三河市",
					"updated": 1527133439000,
					"userId": 10
				}, {
					"created": 1527133439000,
					"id": 2,
					"isDefault": 1,
					"receiveAddress": "燕郊燕京航城",
					"receiveName": "牛雨晴",
					"receivePhone": "18001250752",
					"receiveRegion": "河北省,廊坊市,三河市",
					"updated": 1527133439000,
					"userId": 10
				}, {
					"created": 1527133439000,
					"id": 2,
					"isDefault": 1,
					"receiveAddress": "燕郊燕京航城",
					"receiveName": "牛雨晴",
					"receivePhone": "18001250752",
					"receiveRegion": "河北省,廊坊市,三河市",
					"updated": 1527133439000,
					"userId": 10
				}],
				"msg": "OK",
				"status": 200
			};
			this.userReceiveInfoList = result.data;
			
			for(var i=0;i<this.userReceiveInfoList.length;i++){
				if (this.userReceiveInfoList[i].isDefault=='1') { // 默认收货地址
					this.receivingAddress = this.userReceiveInfoList[i].receiveRegion.replace(/,/g,'') + this.userReceiveInfoList[i].receiveAddress;
					this.addressee = this.userReceiveInfoList[i].receiveName;
					this.addresseePhone = this.userReceiveInfoList[i].receivePhone;
					this.userReceiveInfoId = this.userReceiveInfoList[i].id;
				}
			}
			
			for(var j = 0; j < this.userReceiveInfoList.length; j++) {
				if (!(j >= 3)) {
					this.threeUserReceiveInfoList.push(this.userReceiveInfoList[j]);
				}
			}
			
			console.log(this.threeUserReceiveInfoList);*/
		},
		updateAddressToDefault: function(id) { // 修改默认收货地址
			this.$http.post('http://localhost:8083/zujahome-main/user/updateAddressToDefault', {
				addressId: id
			}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				console.log(data.body);
				if(data.body.status == '200') {
					window.location.reload();
				} else {
					alert(data.body.msg);
				}
			}, function(a) {
				console.log('请求错误 ')
			});
		},
		updateUserReceiveInfo: function(id, region, name, phone, addr) { // 收货地址的修改
			this.$http.post('http://localhost:8083/zujahome-main/user/updateUserReceiveInfo', {
				id: id,
				receiveRegion: region,
				receiveName: name,
				receivePhone: phone,
				receiveAddress: addr
			}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				console.log(data.body);
				if(data.body.status == '200') {
					window.location.reload();
				} else {
					alert(data.body.msg);
				}
			}, function(a) {
				console.log('请求错误 ')
			});
		},
		createOrder: function() { // 创建订单
			this.$http.post('http://localhost:8083/zujahome-main/order/createOrder', {
				orderDetail: JSON.stringify(this.orderListObj),
				userReceiveInfoId: this.userReceiveInfoId,
				payWay : this.payWay,
			}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				if(data.body.status == '500') {
					/*if (this.weChatPay) {  // 微信支付
						window.location.href = 'syt.html?pay=1';
					} else if(this.alipayPay){  // 支付宝支付
						window.location.href = 'syt.html?pay=2';
					}*/
					
					alert(data.body.msg);
				}
			}, function(a) {
				console.log('请求错误 ')
			});
		}
	}
});