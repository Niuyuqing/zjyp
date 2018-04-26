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

	//找回密码
	'use strict';
	
	var retrievePwdWrap = new Vue({
		el: '.retrievePwdWrap',
		data: {
			step1: true,
			step2: false,
			step3: false,
			errorTip1: false, // 错误提示消息是否显示
			errorTipMsg1: '', // 错误提示消息文本
			errorTip2: false, // 错误提示消息是否显示
			errorTipMsg2: '', // 错误提示消息文本
			errorTip3: false, // 错误提示消息是否显示
			errorTipMsg3: '', // 错误提示消息文本
			phone: '',
			codeNum: '',
			pwd: '',
			againPwd: '',
			countDown: 3 },
		// 倒计时跳转到登录页
		mounted: function mounted() {},
		methods: {
			nextStepClick: function nextStepClick() {
				// 点击下一步
				if (!this.checkPhone(this.phone)) {
					this.errorTip1 = true;
					this.errorTipMsg1 = '请输入正确手机号码';
				} else if (this.codeNum == '') {
					this.errorTip1 = true;
					this.errorTipMsg1 = '请输入验证码';
				} else {
					this.errorTip1 = false;
					this.errorTipMsg1 = '';
	
					this.step1 = false;
					this.step2 = true;
					this.step3 = false;
				}
			},
			saveClick: function saveClick() {
				// 保存
				var that = this;
				if (!this.checkPwd(this.pwd)) {
					this.errorTip2 = true;
					this.errorTipMsg2 = '密码6-20位数字、字母、字符组合';
				} else if (this.pwd != this.againPwd) {
					this.errorTip2 = true;
					this.errorTipMsg2 = '两次密码输入不一致';
				} else {
					this.step1 = false;
					this.step2 = false;
					this.step3 = true;
	
					setInterval(function () {
						that.countDown--;
						console.log(typeof that.countDown);
						if (that.countDown == 0) {
							window.location.href = 'login.html';
						}
					}, 1000);
				}
			},
			getCodeNum: function getCodeNum() {
				// 获取验证码
				if (!this.checkPhone(this.phone)) {
					this.errorTip1 = true;
					this.errorTipMsg1 = '请输入正确手机号码';
				} else {
					this.errorTip1 = false;
					this.errorTipMsg1 = '';
				}
			},
			checkPhone: function checkPhone(val) {
				// 验证手机号
				var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				return reg.test(val);
			},
			checkPwd: function checkPwd(val) {
				// 验证密码
				//var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
				var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;
				return reg.test(val);
			}
		}
	});

/***/ })
/******/ ]);
//# sourceMappingURL=retrievePwd.js.map