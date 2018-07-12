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
			smfurniture: true, // 实木家具
			pgfurniture: false, // 皮革家具
			bySofa: false, // 布艺沙发
			mattress: false, // 床垫
			woodFloor: false, // 木地板
			lighting: false },
		// 灯饰
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
			smfurnitureFn: function smfurnitureFn() {
				this.smfurniture = true; // 实木家具
				this.pgfurniture = false; // 皮革家具
				this.bySofa = false; // 布艺沙发
				this.mattress = false; // 床垫
				this.woodFloor = false; // 木地板
				this.lighting = false; // 灯饰
			},
			pgfurnitureFn: function pgfurnitureFn() {
				this.smfurniture = false; // 实木家具
				this.pgfurniture = true; // 皮革家具
				this.bySofa = false; // 布艺沙发
				this.mattress = false; // 床垫
				this.woodFloor = false; // 木地板
				this.lighting = false; // 灯饰
			},
			bySofaFn: function bySofaFn() {
				this.smfurniture = false; // 实木家具
				this.pgfurniture = false; // 皮革家具
				this.bySofa = true; // 布艺沙发
				this.mattress = false; // 床垫
				this.woodFloor = false; // 木地板
				this.lighting = false; // 灯饰
			},
			mattressFn: function mattressFn() {
				this.smfurniture = false; // 实木家具
				this.pgfurniture = false; // 皮革家具
				this.bySofa = false; // 布艺沙发
				this.mattress = true; // 床垫
				this.woodFloor = false; // 木地板
				this.lighting = false; // 灯饰
			},
			woodFloorFn: function woodFloorFn() {
				this.smfurniture = false; // 实木家具
				this.pgfurniture = false; // 皮革家具
				this.bySofa = false; // 布艺沙发
				this.mattress = false; // 床垫
				this.woodFloor = true; // 木地板
				this.lighting = false; // 灯饰
			},
			lightingFn: function lightingFn() {
				this.smfurniture = false; // 实木家具
				this.pgfurniture = false; // 皮革家具
				this.bySofa = false; // 布艺沙发
				this.mattress = false; // 床垫
				this.woodFloor = false; // 木地板
				this.lighting = true; // 灯饰
			}
		}
	});
	
	$(function () {});

/***/ })
/******/ ]);
//# sourceMappingURL=furnitureMaintenance.js.map