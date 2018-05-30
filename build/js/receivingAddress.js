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
	
	var personalDataMain = new Vue({
		el: '.personalDataMain',
		data: {
			editAddressBox: false, // 编辑收货地址弹框
			delBox: false, // 删除收货地址弹框
			userReceiveInfoList: [], // 收货地址列表
			delAddressId: '', // 删除收货信息ID
			phoneErrorTip: true, // 电话填写错误提示
	
			// 点击编辑按钮的收货地址数据
			editId: '',
			editName: '',
			editAddress: '',
			editPhone: '',
			editProvince: '',
			editCity: '',
			editArea: '',
			editRegion: '',
	
			// 新增
			receiveRegion: '', // 区域
			receiveName: '', // 姓名
			receivePhone: '', // 电话
			receiveAddress: '', // 地址
			province: '', // 省
			city: '', // 市
			area: '' },
		// 区
		mounted: function mounted() {
			this.showUserReceiveInfoList(); // 收货地址
		},
		methods: {
			checkPhone: function checkPhone(val) {
				// 验证手机号
				var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				return reg.test(val);
			},
			/**
	   * 添加收货人信息
	   * @param {Object} val
	   * @param {Object} type  1 新增    2 点击关闭按钮   3 保存收货地址
	   */
			addConsigneeMsg: function addConsigneeMsg(val, type, saveORedit) {
				if (type == '1') {
					this.addBox = val;
	
					// 清空上次填写地址内容
					this.receiveName = '';
					this.receivePhone = '';
					this.receiveAddress = '';
				} else if (type == '2') {
					this.addBox = val;
				} else if (type == '3') {
					// 点击保存收货地址按钮
					this.phoneErrorTip = this.checkPhone(this.receivePhone);
					if (this.phoneErrorTip) {
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
						}).then(function (data) {
							if (data.body.status == '200') {
								this.showUserReceiveInfoList(); // 展示收货地址列表
							} else {
									alert(data.body.msg);
								}
						}, function (a) {
							console.log('请求错误 ');
						});
					} else {
						this.addBox = true;
					}
				}
			},
			editAddressBoxFn: function editAddressBoxFn(val, id, name, region, addr, phone) {
				this.editAddressBox = val;
	
				if (val == true) {
					// 一定是在为true的时候设置遮罩层高度，如果在页面进入设置高度，是无效的，因为还没有创建这个元素
					setTimeout(function () {
						$('.frameMask').css({
							width: $(window).width() + 'px',
							height: document.body.scrollHeight + 'px'
						});
	
						// 省市区要放在定时器里面初始化，因为默认是没有这个元素的
						$('#distpicker4').distpicker({
							province: personalDataMain.editProvince,
							city: personalDataMain.editCity,
							district: personalDataMain.editArea,
							autoSelect: false
						});
					}, 100);
				};
	
				var arr = region.split(',');
				this.editRegion = region;
				this.editId = id;
				this.editName = name;
				this.editAddress = addr;
				this.editPhone = phone;
				this.editProvince = arr[0];
				this.editCity = arr[1];
				if (arr[2]) {
					this.editArea = arr[2];
				};
			},
			delAddressBoxFn: function delAddressBoxFn(val, who, id) {
				// 删除收货人信息
				this.delBox = val;
				if (who == '1') {
					// 确定删除
					this.$http.post('http://localhost:8083/zujahome-main/user/delUserReceiveInfo', {
						infoId: this.delAddressId
					}, { // 没有参数也要放空的大括号
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						if (data.body.status == '200') {
							this.showUserReceiveInfoList(); // 展示收货地址列表
						} else {
								alert(data.body.msg);
							}
					}, function (a) {
						console.log('请求错误 ');
					});
				} else if (who == '2') {
					// 点击删除按钮
					this.delAddressId = id;
				}
				if (val == true) {
					// 一定是在为true的时候设置遮罩层高度，如果在页面进入设置高度，是无效的，因为还没有创建这个元素
					setTimeout(function () {
						$('.frameMask').css({
							width: $(window).width() + 'px',
							height: document.body.scrollHeight + 'px'
						});
					}, 100);
				}
			},
			updateUserReceiveInfo: function updateUserReceiveInfo() {
				// 收货地址的修改
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
				}).then(function (data) {
					if (data.body.status == '200') {
						this.showUserReceiveInfoList(); // 展示收货地址列表
					} else {
							alert(data.body.msg);
						}
				}, function (a) {
					console.log('请求错误 ');
				});
			},
			showUserReceiveInfoList: function showUserReceiveInfoList() {
				// 展示收货地址列表
				this.$http.post('http://localhost:8083/zujahome-main/user/showUserReceiveInfoList', {}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					this.userReceiveInfoList = data.body.data;
	
					for (var i = 0; i < this.userReceiveInfoList.length; i++) {
						if (this.userReceiveInfoList[i].isDefault == '1') {
							// 默认收货地址
							this.receivingAddress = this.userReceiveInfoList[i].receiveRegion.replace(/,/g, '') + this.userReceiveInfoList[i].receiveAddress;
							this.addressee = this.userReceiveInfoList[i].receiveName;
							this.addresseePhone = this.userReceiveInfoList[i].receivePhone;
							this.userReceiveInfoId = this.userReceiveInfoList[i].id;
						}
					}
				}, function (a) {
					console.log('请求错误 ');
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
	   	}],
	   	"msg": "OK",
	   	"status": 200
	   };
	   this.userReceiveInfoList = result.data;*/
			}
		}
	});
	
	$(function () {
		$('#distpicker5').distpicker({
			province: '请选择',
			city: '请选择',
			district: '请选择',
			autoSelect: false
		});
	});

/***/ })
/******/ ]);
//# sourceMappingURL=receivingAddress.js.map