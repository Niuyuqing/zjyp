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
	
	var sytMain = new Vue({
		el: '.sytMain',
		data: {
			weChatPay: true,
			alipay: false,
			payWay: '' },
		// 上个页面选择的支付方式
		mounted: function mounted() {
			// 上个页面选择的支付方式
			this.payWay = this.getUrlParam('pay');
			if (this.payWay == '1') {
				// 微信
				this.weChatPay = true;
				this.alipay = false;
			} else if (this.payWay == '2') {
				// 支付宝
				this.weChatPay = false;
				this.alipay = true;
			}
		},
		methods: {
			switchWeChat: function switchWeChat() {
				// 切换到微信支付
				this.weChatPay = true;
				this.alipay = false;
			},
			switchAlipay: function switchAlipay() {
				// 切换到支付宝支付
				this.weChatPay = false;
				this.alipay = true;
			},
			getUrlParam: function getUrlParam(key) {
				// 地址栏中文也可以正常获取
				// 获取参数
				var url = window.location.search;
				// 正则筛选地址栏
				var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
				// 匹配目标参数
				var result = url.substr(1).match(reg);
				//返回参数值
				return result ? decodeURIComponent(result[2]) : null;
			}
		}
	});

/***/ })
/******/ ]);
//# sourceMappingURL=syt.js.map