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

	// 页面跳转
	'use strict';
	
	var toPage = new Vue({
		el: '.toPage',
		data: {
			toPagesArr: {
				index: 'index.html',
				zjyp: 'zjyp.html',
				ypzp: 'ypzp.html',
				zjshj: 'zjshj.html',
				zjfs: 'zjfs.html',
				zjh: 'zjh.html',
				zzyjm: 'zzyjm.html',
				qwdz: 'qwdz.html',
				yptc: 'yptc.html',
				xxtyg: 'xxtyg.html',
				cshhr: 'cityPartner.html'
			}
		},
		mounted: function mounted() {},
		methods: {}
	});
	
	// 搜索部分
	var searchWrap = new Vue({
		el: '.searchWrap',
		data: {
			shoppingNum: 0 },
		// 购物车商品数量
		mounted: function mounted() {
			// 查询购物车列表数量
			this.$http.post('http://localhost:8083/zujahome-main/cart/showCartListNum', {}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				this.shoppingNum = data.body.data;
			}, function (a) {
				console.log('请求错误 ');
			});
		},
		methods: {}
	});
	
	var header = new Vue({
		el: '.pageHeader',
		data: {
			userLogin: false, // 判断用户是否登录
			nickName: '', // 用户昵称
			freeDesign: false },
		// 预约免费设计
		mounted: function mounted() {
			// 展示用户的详细信息
			this.$http.post('http://localhost:8083/zujahome-main/user/showUserDetail', {}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				var result = data.body;
				if (result.status == '200') {
					if (result.data == null) {
						this.userLogin = false;
					} else {
						this.userLogin = true;
						if (result.data.nickname == null) {
							this.nickName = result.data.phone;
						} else {
							this.nickName = result.data.nickname;
						}
					}
				} else {
					alert(data.body.msg);
				}
			}, function (a) {
				console.log('请求错误 ');
			});
		},
		methods: {
			// 退出
			logout: function logout() {
				this.$http.post('http://localhost:8083/zujahome-main/user/logout', {}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					console.log(data.body);
					if (data.body.status == '200') {
						window.location.reload();
					} else {
						alert(data.body.msg);
					}
				}, function (a) {
					console.log('请求错误 ');
				});
			},
			freeDesignFn: function freeDesignFn(val, who) {
				// 点击预约免费设计
				// 设置遮罩层高度
				setTimeout(function () {
					$('.mask').css({
						'width': $(document).width() + 'px',
						'height': document.body.scrollHeight + 'px'
					});
				}, 10);
	
				if (who == '1') {
					// 点击立即领取按钮
					this.$http.post('http://localhost:8083/zujahome-main/item/showItemClassifyList', {}, { // 没有参数也要放空的大括号
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						this.freeDesign = val;
	
						if (data.body.status == '200') {} else {
							alert(data.body.msg);
						}
					}, function (a) {
						console.log('请求错误 ');
					});
				} else {
					this.freeDesign = val;
				}
			}
		}
	});
	
	//日期格式化，精确到年月日
	Vue.filter('dateFormat', function (value) {
		//value为13位的时间戳
		function add0(m) {
			return m < 10 ? '0' + m : m;
		}
		var time = new Date(parseInt(value));
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
	
		return y + '.' + add0(m) + '.' + add0(d);
	});
	
	//日期格式化，精确到年月日时分秒
	Vue.filter('timestampToTime', function (value) {
		var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		Y = date.getFullYear() + '-';
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		D = date.getDate() + ' ';
		h = date.getHours() + ':';
		m = date.getMinutes() + ':';
		s = date.getSeconds();
		return Y + M + D + h + m + s;
	});
	
	// 格式化金额（保留两位小数）
	Vue.filter('money', function (val) {
		val = val.toString().replace(/\$|\,/g, '');
		if (isNaN(val)) {
			val = "0";
		}
		var sign = val == (val = Math.abs(val));
		val = Math.floor(val * 100 + 0.50000000001);
		var cents = val % 100;
		val = Math.floor(val / 100).toString();
		if (cents < 10) {
			cents = "0" + cents;
		}
		/*for(var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
	 	val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
	 }*/
	
		return (sign ? '' : '-') + val + '.' + cents;
	});
	
	//手机号码正则
	function checkMobile(val) {
		var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
		return reg.test(val);
	}
	
	//邮箱正则
	function checkEmail(val) {
		var reg = /^\w+([-+2.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return reg.test(val);
	}
	
	//密码正则，6-18位，包含数字和字母
	function checkPwd(val) {
		var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
		return reg.test(val);
	}
	
	/**
	 * 上传图片预览
	 * @param file
	 * @returns
	 */
	function preview(file) {
		var prevDiv = document.getElementsByClassName('nowHeaderPic')[0];
		if (file.files && file.files[0]) {
			var reader = new FileReader();
			reader.onload = function (evt) {
				//prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
				prevDiv.setAttribute("src", evt.target.result);
			};
			reader.readAsDataURL(file.files[0]);
		}
	}
	
	/**
	 * 时间戳转化时间返回年月日
	 * @param shijianchuo
	 * @returns
	 */
	function add1(m) {
		return m < 10 ? '0' + m : m;
	};
	
	function getDate(shijianchuo) {
		//shijianchuo是整数，否则要parseInt转换 
		var time = new Date(shijianchuo);
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		return y + '-' + add1(m) + '-' + add1(d);
	};
	
	/** 
	 * 获取下一个月 
	 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
	 */
	function getNextMonth(date) {
		var arr = date.split('-');
		var year = arr[0]; //获取当前日期的年份 
		var month = arr[1]; //获取当前日期的月份 
		var day = arr[2]; //获取当前日期的日 
		var days = new Date(year, month, 0);
		days = days.getDate(); //获取当前日期中的月的天数 
		var year2 = year;
		var month2 = parseInt(month) - 1;
		if (month2 == 0) {
			year2 = parseInt(year2) - 1;
			month2 = 12;
		}
		var day2 = day;
		var days2 = new Date(year2, month2, 0);
		days2 = days2.getDate();
		if (day2 > days2) {
			day2 = days2;
		}
		if (month2 < 10) {
			month2 = '0' + month2;
		}
	
		var t2 = year2 + '-' + month2 + '-' + day2;
		return t2;
	};
	
	// 地址栏中文也可以正常获取
	function getUrlParam(key) {
		// 获取参数
		var url = window.location.search;
		// 正则筛选地址栏
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		// 匹配目标参数
		var result = url.substr(1).match(reg);
		//返回参数值
		return result ? decodeURIComponent(result[2]) : null;
	};
	
	(function (doc) {
		function changeSize() {
			var size = doc.documentElement.clientWidth / 128;
			doc.querySelector('html').style.fontSize = size + 'px';
		}
		//用户缩放浏览器窗口大小时
		window.onresize = changeSize;
		changeSize();
	
		// 鼠标移入移出家具馆
		$('.jjgWrap,.jjgClassifyBox').on({
			'mouseenter': function mouseenter() {
				$('.jjgClassifyBox').show();
	
				$('.jjgWrap').css('background', '#fff');
	
				$('.jjgWrap span').css({
					'color': '#333'
				});
	
				$('.jjgWrap h3').css({
					'color': '#cd2f1d'
				});
	
				$('.jjgWrap h3 i').css('background-image', 'url("images/jjg_hover.png")');
			},
			'mouseleave': function mouseleave() {
				$('.jjgClassifyBox').hide();
	
				$('.jjgWrap').css('background', 'transparent');
	
				$('.jjgWrap span').css({
					'color': '#fff'
				});
	
				$('.jjgWrap h3').css({
					'color': '#fff'
				});
	
				$('.jjgWrap h3 i').css('background-image', 'url("images/jjg.png")');
			}
		});
	
		// 设置页面打开方式都是新开一个页面
		$('.navigationWrap a').prop('target', '_blank');
	
		// 鼠标移入移出筑家汇
		/*$('.toPage .zjh,.zjhSubtitle').on({
	 	'mouseenter':function () {
	 		$('.toPage .zjh').css({
	 			'background':'#cd2f1d'
	 		})
	 		$('.toPage .zjh a').css({
	 			'color':'#fff'
	 		})
	 		$('.zjhSubtitle').show('fast');
	 	},
	 	'mouseleave':function () {
	 		$('.toPage .zjh').css({
	 			'background':'#fff'
	 		})
	 		$('.toPage .zjh a').css({
	 			'color':'#333'
	 		})
	 		$('.zjhSubtitle').hide('fast');
	 	}
	 });*/
	})(document);

/***/ })
/******/ ]);
//# sourceMappingURL=common.js.map