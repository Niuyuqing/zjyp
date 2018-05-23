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
			allOrder: true, // 全部订单
			waitPay: false, // 待付款
			alreadyPay: false, // 已付款
			waitTakeGoods: false, // 待收货
			waitAssess: false },
		// 待评价
		mounted: function mounted() {
			// 翻页器
			$('.paging').pagination({
				pageCount: 50,
				coping: true,
				mode: 'fixed',
				activeCls: 'activeCls',
				homePage: '首页',
				endPage: '尾页',
				prevContent: '<img src="./images/prevPage.png"/>',
				nextContent: '<img src="./images/nextPage.png"/>',
				callback: function callback(api) {
					this.nowPageNum = api.getCurrent();
					console.log('bb:' + this.nowPageNum);
				}
			});
		},
		methods: {
			cancleOrderClick: function cancleOrderClick(val, type) {
				// 取消订单
				this.cancleBox = val;
				if (type == 2) {
					this.cancleSuccBox = true;
				}
			},
			delBoxClick: function delBoxClick(val) {
				// 删除订单
				this.delBox = val;
			},
			cancleSuccBoxClick: function cancleSuccBoxClick(val) {
				// 取消订单成功弹框
				this.cancleSuccBox = val;
			},
			orderStatusClick: function orderStatusClick(val) {
				if (val == 1) {
					// 全部订单
					this.allOrder = true;
					this.waitPay = false;
					this.alreadyPay = false;
					this.waitTakeGoods = false;
					this.waitAssess = false;
				} else if (val == 2) {
					this.allOrder = false;
					this.waitPay = true;
					this.alreadyPay = false;
					this.waitTakeGoods = false;
					this.waitAssess = false;
				} else if (val == 3) {
					this.allOrder = false;
					this.waitPay = false;
					this.alreadyPay = true;
					this.waitTakeGoods = false;
					this.waitAssess = false;
				} else if (val == 4) {
					this.allOrder = false;
					this.waitPay = false;
					this.alreadyPay = false;
					this.waitTakeGoods = true;
					this.waitAssess = false;
				} else if (val == 5) {
					this.allOrder = false;
					this.waitPay = false;
					this.alreadyPay = false;
					this.waitTakeGoods = false;
					this.waitAssess = true;
				}
			}
		}
	});
	
	$(function () {
		setTimeout(function () {
			// 遮罩层默认样式
			$('.mask').css({
				'width': $(document).width() + 'px',
				'height': document.body.scrollHeight + 'px'
			});
		}, 2000);
	
		// 设置翻页距左边距离
		$('.pagingWrap .paging').css({
			'margin-left': ($('.pagingWrap').width() - $('.pagingWrap .paging').width()) / 2 + 'px'
		});
	});

/***/ })
/******/ ]);
//# sourceMappingURL=personCenter.js.map