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
	
	var loginFormWrap = new Vue({
		el: '.loginFormWrap',
		data: {
			errorTip: false, // 错误提示消息是否显示
			errorTipMsg: '', // 错误提示消息文本
			phone: '',
			pwd: ''
		},
		mounted: function mounted() {},
		methods: {
			loginClick: function loginClick() {
				// 点击登录
				if (!this.checkPhone(this.phone)) {
					this.errorTip = true;
					this.errorTipMsg = '请输入正确手机号码';
				} else if (this.pwd == '') {
					this.errorTip = true;
					this.errorTipMsg = '请输入密码';
				} else {
					this.errorTip = false;
					this.errorTipMsg = '';
	
					// 登录接口
					this.$http.post('http://localhost:8083/zujahome-main/user/login', {
						phone: this.phone,
						password: this.pwd
					}, { // 没有参数也要放空的大括号
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						console.log(data.body);
						if (data.body.status == '200') {
							window.location.href = 'index.html';
						} else {
							this.errorTip = true;
							this.errorTipMsg = data.body.msg;
						}
					}, function (a) {
						console.log('请求错误 ');
					});
				}
			},
			checkPhone: function checkPhone(val) {
				// 验证手机号
				var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				return reg.test(val);
			}
		}
	});

/***/ })
/******/ ]);
//# sourceMappingURL=login.js.map