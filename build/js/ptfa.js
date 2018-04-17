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
	
	var ptfaPage = new Vue({
		el: '.ptfaPage',
		data: {
			allRoom: true, // 全部空间
			diningRoom: false, // 客餐厅
			bedRoom: false, // 卧房
			childrenRoom: false, // 儿童房
			studyRoom: false },
		// 书房
		mounted: function mounted() {},
		methods: {
			allRoomClick: function allRoomClick() {
				// 全部空间点击
				this.allRoom = true;
				this.diningRoom = false;
				this.bedRoom = false;
				this.childrenRoom = false;
				this.studyRoom = false;
			},
			diningRoomClick: function diningRoomClick() {
				// 客餐厅点击
				this.allRoom = false;
				this.diningRoom = true;
				this.bedRoom = false;
				this.childrenRoom = false;
				this.studyRoom = false;
			},
			bedRoomClick: function bedRoomClick() {
				// 卧房点击
				this.allRoom = false;
				this.diningRoom = false;
				this.bedRoom = true;
				this.childrenRoom = false;
				this.studyRoom = false;
			},
			childrenRoomClick: function childrenRoomClick() {
				// 儿童房点击
				this.allRoom = false;
				this.diningRoom = false;
				this.bedRoom = false;
				this.childrenRoom = true;
				this.studyRoom = false;
			},
			studyRoomClick: function studyRoomClick() {
				// 书房点击
				this.allRoom = false;
				this.diningRoom = false;
				this.bedRoom = false;
				this.childrenRoom = false;
				this.studyRoom = true;
			}
		}
	});
	
	$(function () {
		// 配套方案
		$('.toPage a').css('color', '#333');
		$('.toPage .ptfa a').css('color', '#cd2f1d');
	});

/***/ })
/******/ ]);
//# sourceMappingURL=ptfa.js.map