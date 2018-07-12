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

	'use strict';
	
	var freeRegistrMain = new Vue({
		el: '.freeRegistrMain',
		data: {
			goodsRelevant: true, // 商品相关
			distribution: false, // 配送
			payment: false, // 付款
			afterSale: false },
		// 售后
		mounted: function mounted() {
			// 商品分类接口
			this.$http.post('http://localhost:8083/zujahome-main/item/showItemClassifyList', {}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				console.log(JSON.parse(JSON.parse(data.body.data).rows[0].cat_info));
			}, function (a) {
				console.log('请求错误 ');
			});
		},
		methods: {
			// 商品相关
			goodsRelevantFn: function goodsRelevantFn() {
				this.goodsRelevant = true; // 商品相关
				this.distribution = false; // 配送
				this.payment = false; // 付款
				this.afterSale = false; // 售后
			},
			// 配送相关
			distributionFn: function distributionFn() {
				this.goodsRelevant = false; // 商品相关
				this.distribution = true; // 配送
				this.payment = false; // 付款
				this.afterSale = false; // 售后
			},
			// 付款相关
			paymentFn: function paymentFn() {
				this.goodsRelevant = false; // 商品相关
				this.distribution = false; // 配送
				this.payment = true; // 付款
				this.afterSale = false; // 售后
			},
			// 售后相关
			afterSaleFn: function afterSaleFn() {
				this.goodsRelevant = false; // 商品相关
				this.distribution = false; // 配送
				this.payment = false; // 付款
				this.afterSale = true; // 售后
			}
		}
	});
	
	$(function () {});

/***/ })
/******/ ]);
//# sourceMappingURL=receiptGuide.js.map