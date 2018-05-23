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
	
	var jsyMain = new Vue({
		el: '.jsyMain',
		data: {
			delBox: false, // 默认不显示删除弹框和灰色遮罩层
			addBox: false, // 默认不显示新增收货地址弹框
			unfoldAddress: false, // 收起/展开地址
			weChatPay: true, // 微信支付
			alipayPay: false, // 支付宝支付
			receiveRegion: '', // 区域
			receiveName: '', // 姓名
			receivePhone: '', // 电话
			receiveAddress: '', // 地址
			province: '', // 省
			city: '', // 市
			area: '', // 区
			phoneErrorTip: true },
		// 电话填写错误提示
		mounted: function mounted() {},
		methods: {
			checkPhone: function checkPhone(val) {
				// 验证手机号
				var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				return reg.test(val);
			},
			delConsigneeMsg: function delConsigneeMsg(val) {
				// 删除收货人信息
				this.delBox = val;
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
			/**
	   * 添加收货人信息
	   * @param {Object} val
	   * @param {Object} type  1 新增    2 点击关闭按钮   3 保存收货地址
	   */
			addConsigneeMsg: function addConsigneeMsg(val, type) {
				if (type == '1') {
					this.addBox = val;
	
					// 清空上次填写地址内容
					this.receiveName = '';
					this.receivePhone = '';
					this.receiveAddress = '';
	
					// 一定是在为true的时候设置遮罩层高度，如果在页面进入设置高度，是无效的，因为还没有创建这个元素
					setTimeout(function () {
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
						}).then(function (data) {}, function (a) {
							console.log('请求错误 ');
						});
					} else {
						this.addBox = true;
					}
				}
			},
			unfoldAddressClick: function unfoldAddressClick() {
				// 收起/展开地址
				this.unfoldAddress = !this.unfoldAddress;
			},
			weChatPayClick: function weChatPayClick() {
				// 点击微信支付
				this.weChatPay = true;
				this.alipayPay = false;
			},
			alipayPayClick: function alipayPayClick() {
				// 点击支付宝支付
				this.weChatPay = false;
				this.alipayPay = true;
			}
		}
	});
	
	$(function () {
		$('.consigneeMsg').on({
			'mouseenter': function mouseenter() {
				$(this).next().show();
				$(this).find($('.setDefAddress,.edit,.del')).show();
			},
			'mouseleave': function mouseleave() {
				$(this).next().hide();
				$(this).find($('.setDefAddress,.edit,.del')).hide();
			}
		});
	});

/***/ })
/******/ ]);
//# sourceMappingURL=jsy.js.map