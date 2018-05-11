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
			},
			delAddressBoxFn: function delAddressBoxFn(val) {
				this.delBox = val;
			}
		}
	});
	
	$(function () {
		$('.frameMask').css({
			'width': $(document).width() + 'px',
			'height': $(document).height() + 'px'
		});
	});

/***/ })
/******/ ]);
//# sourceMappingURL=receivingAddress.js.map