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
	
	var registerFormWrap = new Vue({
		el: '.registerFormWrap',
		data: {
			agreement: true, // 是否勾选用户协议
			errorTip: false, // 错误提示消息是否显示
			errorTipMsg: '', // 错误提示消息文本
			phone: '',
			pwd: '',
			againPwd: '',
			codeNum: '',
			authCode: true, // 获取验证码按钮
			daoTime: 60 },
		// 验证码倒计时
		mounted: function mounted() {},
		methods: {
			agreementClick: function agreementClick() {
				// 用户协议点击
				this.agreement = !this.agreement;
			},
			getCodeNum: function getCodeNum() {
				// 获取验证码
				this.daoTime = 60; // 验证码倒计时
				if (!this.checkPhone(this.phone)) {
					this.errorTip = true;
					this.errorTipMsg = '请输入正确手机号码';
				} else {
					// 获取验证码接口
					this.$http.post('http://localhost:8083/zujahome-main/user/phoneAuthCode', {
						phone: this.phone
					}, {
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						if (data.body.status == '200') {
							this.errorTip = false;
							this.errorTipMsg = '';
							this.authCode = false;
	
							// 验证码倒计时
							var daoTimeFn = setInterval(function () {
								if (registerFormWrap.daoTime <= 1) {
									registerFormWrap.authCode = true;
									clearInterval(daoTimeFn);
								} else {
									registerFormWrap.daoTime--;
								}
							}, 1000);
						} else {
							this.errorTip = true;
							this.errorTipMsg = '验证码获取失败';
						}
					}, function (a) {
						console.log('请求错误 ');
					});
				}
			},
			registerClick: function registerClick() {
				// 点击注册
				if (!this.checkPhone(this.phone)) {
					this.errorTip = true;
					this.errorTipMsg = '请输入正确手机号码';
				} else if (!this.checkPwd(this.pwd)) {
					this.errorTip = true;
					this.errorTipMsg = '密码6-20位数字、字母、字符组合';
				} else if (this.pwd != this.againPwd) {
					this.errorTip = true;
					this.errorTipMsg = '两次密码输入不一致';
				} else if (this.codeNum == '') {
					this.errorTip = true;
					this.errorTipMsg = '请输入验证码';
				} else {
					this.errorTip = false;
					this.errorTipMsg = '';
	
					// 注册接口
					this.$http.post('http://localhost:8083/zujahome-main/user/register', {
						phone: this.phone,
						password: this.pwd,
						authcode: this.codeNum
					}, {
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						console.log(data.body);
						if (data.body.status == '200') {
							alert('注册成功');
	
							// 注册成功后自动进行登录，跳转到首页面
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
									alert('登录失败，请您到登录页面重新进行登录');
									window.location.href = 'login.html';
								}
							}, function (a) {
								console.log('请求错误 ');
							});
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
//# sourceMappingURL=register.js.map