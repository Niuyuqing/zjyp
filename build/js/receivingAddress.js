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
			delBox: false },
		// 删除收货地址弹框
		mounted: function mounted() {},
		methods: {
			editAddressBoxFn: function editAddressBoxFn(val) {
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
							province: '请选择',
							city: '请选择',
							district: '请选择',
							autoSelect: false
						});
					}, 100);
				}
			},
			delAddressBoxFn: function delAddressBoxFn(val) {
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