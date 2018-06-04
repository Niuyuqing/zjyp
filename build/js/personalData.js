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
			customHeadBox: false, // 编辑头像弹框
			nickname: '',
			realname: '',
			headp: '',
			sex: '',
			birthday: '',
			userDetails: '' },
		// 用户信息
		mounted: function mounted() {
			// 展示用户的详细信息
			this.$http.post('http://localhost:8083/zujahome-main/user/showUserDetail', {}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				if (data.body.status == '200') {
					this.userDetails = data.body.data;
					this.nickname = this.userDetails.nickname;
					this.realname = this.userDetails.realname;
					this.sex = this.userDetails.sex;
					this.birthday = this.userDetails.birthday;
					this.headp = this.userDetails.headp;
	
					if (this.sex == '0') {
						$('#woman').prop('checked', 'checked');
					} else if (this.sex == '1') {
						$('#man').prop('checked', 'checked');
					}
	
					$('#birthdayDate').val(this.birthday);
	
					$('.personalDataMain .rBoxWrap .headImg').css({
						'background-image': 'url(' + this.headp + ')'
					});
				} else {
					alert(data.body.msg);
				}
	
				console.log(data.body.data);
			}, function (a) {
				console.log('请求错误 ');
			});
	
			/*var result = {
	  	"data": {
	  		"birthday": "2018-06-01",
	  		"created": 1526525695000,
	  		"headp": "http://192.168.2.16:8080/uploadfiles/20180602/2018060209160700048",
	  		"id": "10",
	  		"nickname": "1",
	  		"password": "df10ef8509dc176d733d59549e7dbfaf",
	  		"realname": "11",
	  		"sex": 1,
	  		"updated": 1526539499000
	  	},
	  	"msg": "OK",
	  	"status": 200
	  }
	  this.userDetails = result.data;
	  		this.nickname = this.userDetails.nickname;	
	  this.realname = this.userDetails.realname;
	  this.sex = this.userDetails.sex;
	  this.birthday = this.userDetails.birthday;
	  this.headp = this.userDetails.headp;
	  		if(this.sex == '0') {
	  	$('#woman').prop('checked', 'checked');
	  } else if(this.sex == '1') {
	  	$('#man').prop('checked', 'checked');
	  }
	  		$('#birthdayDate').val(this.birthday);
	  		$('.personalDataMain .rBoxWrap .headImg').css({
	  	'background-image': 'url('+this.headp+')'
	  });*/
		},
		methods: {
			editHeadImg: function editHeadImg(val, who) {
				// 点击编辑头像
				this.customHeadBox = val;
	
				// 一定要注意，这种插件的初始化一定是在这个元素存在之后
				if (val) {
					setTimeout(function () {
						var clipArea = new bjj.PhotoClip("#clipArea", {
							size: [260, 260],
							outputSize: [640, 640],
							file: "#fromLocalFile",
							view: ".viewClipPic",
							ok: "#clipBtn",
							loadStart: function loadStart() {
								console.log("照片读取中");
							},
							loadComplete: function loadComplete() {
								console.log("照片读取完成");
							},
							clipFinish: function clipFinish(dataURL) {
								personalDataMain.headp = dataURL;
							}
						});
					}, 100);
				}
	
				if (who == '1') {
					// 保存
					$('.personalDataMain .rBoxWrap .headImg').css({
						'background-image': $('.viewClipPic').css('background-image')
					});
	
					this.$http.post('http://localhost:8083/zujahome-main/user/uploadUserHeadp', {
						base64Data: this.headp
					}, { // 没有参数也要放空的大括号
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						if (data.body.status == '200') {
							alert('头像保存成功');
						} else {
							alert(data.body.msg);
						}
					}, function (a) {
						console.log('请求错误 ');
					});
				};
			},
			completeUserInfo: function completeUserInfo() {
				// 完善用户信息
				if ($('#man').prop('checked')) {
					// 男1   女0
					this.sex = '1';
				} else {
					this.sex = '0';
				}
	
				this.birthday = $('#birthdayDate').val();
	
				this.$http.post('http://localhost:8083/zujahome-main/user/completeUserInfo', {
					nickname: this.nickname,
					realname: this.realname,
					sex: this.sex,
					birthday: this.birthday
				}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					if (data.body.status == '200') {
						window.location.reload();
					} else {
						alert(data.body.msg);
					}
				}, function (a) {
					console.log('请求错误 ');
				});
			}
		}
	});
	
	$(function () {
		// 遮罩层默认样式
		$('.mask').css({
			'width': $(document).width() + 'px',
			'height': $(document).height() + 'px'
		});
	
		//执行一个laydate实例
		laydate.render({
			elem: '#birthdayDate' //指定元素
		});
	});

/***/ })
/******/ ]);
//# sourceMappingURL=personalData.js.map