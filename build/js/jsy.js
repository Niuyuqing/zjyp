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
			alipayPay: false },
		// 支付宝支付
		mounted: function mounted() {},
		methods: {
			delConsigneeMsg: function delConsigneeMsg(val) {
				// 删除收货人信息
				this.delBox = val;
			},
			addConsigneeMsg: function addConsigneeMsg(val) {
				// 删除收货人信息
				this.addBox = val;
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
		$('.frameMask').css({
			'width': $(document).width() + 'px',
			'height': $(document).height() + 'px'
		});
	
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