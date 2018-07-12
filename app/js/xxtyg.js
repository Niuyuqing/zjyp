// 页面跳转
var xxtygMain = new Vue({
	el: '.xxtygMain',
	data: {
		activity: false, // 活动报名弹框
		activeName: '',
		activePhone: '',
		experience: false, // 体验馆预约弹框
		freeName: '',
		freePhone: '',
		storeList: [], // 体验馆门店列表
		storeTotal: 0,
		activityList: [], // 近期活动列表
		activityNowPageNum: 1,
		storeNowPageNum: 1,
		lng: 0, // 经度值
		lat: 0, // 纬度值
		mapTitle: '',
		mapAddress: '',
		storeProvinceList: [], // 门店列表省
		province: '',
	},
	mounted: function() {
		// 鼠标移入移出体验馆，翻页，展示二维码
		/*$('.appointment .top').on({
			'mouseenter': function() {
				$(this).parent().parent().find('.behind').show();
				$(this).parent().hide();
			},
			'mouseleave' : function () {
				$(this).parent().parent().find('.behind').hide();
				$(this).parent().show();
			}
		});
		
		$('.appointment .behind').on({
			'mouseenter' : function () {
				$(this).show();
				$(this).parent().find('.front').hide();
			},
			'mouseleave' : function () {
				$(this).hide();
				$(this).parent().find('.front').show();
			}
		});*/

		this.showActivityList(); // 近期活动

		// 展示门店所在省份列表
		this.$http.post('http://localhost:8083/zujahome-main/experience/showStoreProvinceList', {}, {
			headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			emulateJSON: true
		}).then(function(data) {
			this.storeProvinceList = data.body.data;

			this.province = this.storeProvinceList[0];
			this.showStoreList(this.storeProvinceList[0]); // 展示门店列表
		}, function(a) {
			console.log('请求错误 ')
		});
	},
	methods: {
		showMap: function() { // 百度地图API功能
			var map = new BMap.Map("allmap");
			var point = new BMap.Point(this.lng, this.lat);
			var marker = new BMap.Marker(point); // 创建标注
			map.addOverlay(marker); // 将标注添加到地图中
			map.centerAndZoom(point, 15);
			var opts = {
				width: 200, // 信息窗口宽度
				height: 100, // 信息窗口高度
				title: this.mapTitle, // 信息窗口标题
				enableMessage: true, //设置允许信息窗发送短息
				message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
			}
			var infoWindow = new BMap.InfoWindow("地址：" + this.mapAddress, opts); // 创建信息窗口对象 
			marker.addEventListener("click", function() {
				map.openInfoWindow(infoWindow, point); //开启信息窗口
			});

			var top_left_control = new BMap.ScaleControl({
				anchor: BMAP_ANCHOR_TOP_LEFT
			}); // 左上角，添加比例尺
			var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
			var top_right_navigation = new BMap.NavigationControl({
				anchor: BMAP_ANCHOR_TOP_RIGHT,
				type: BMAP_NAVIGATION_CONTROL_SMALL
			}); //右上角，仅包含平移和缩放按钮

			map.setCurrentCity("沈阳"); // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
			map.addControl(top_left_control);
			map.addControl(top_left_navigation);
			map.addControl(top_right_navigation);
		},
		storeListClick: function(e, address, name, type) { // 点击门店切换地图
			if(type == '1') { // 最外层
				console.log('最外层')
				$(e.target).parent().find('.appointment').css('background', '#cd2f1d');
				$(e.target).css('background', '#b31200');
			} else if(type == '2') { // front 
				console.log('front')
				$(e.target).parent().parent().find('.appointment').css('background', '#cd2f1d');
				$(e.target).parent().css('background', '#b31200');
			} else if(type == '3') { // top
				console.log('top')
				$(e.target).parent().parent().parent().find('.appointment').css('background', '#cd2f1d');
				$(e.target).parent().parent().css('background', '#b31200');
			} else if(type == '4') {
				console.log('name')
				$(e.target).parent().parent().parent().parent().find('.appointment').css('background', '#cd2f1d');
				$(e.target).parent().parent().parent().css('background', '#b31200');
			}

			// 获取经纬度
			this.getMapPos(address, name);  
		},
		getMapPos: function(address, name) {  // 获取经纬度
			this.mapTitle = name;
			this.mapAddress = address;

			this.$http.post('http://localhost:8083/zujahome-main/experience/changeAddressToPos', {
				address: address
			}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				this.lng = data.body.data.result.location.lng;
				this.lat = data.body.data.result.location.lat;

				this.showMap(); // 调用百度地图
			}, function(a) {
				console.log('请求错误 ')
			});
		},
		showStoreList: function(address) { // 展示门店列表
			this.$http.post('http://localhost:8083/zujahome-main/experience/showStoreList', {
				storeProvince: address,
				pageNum: this.storeNowPageNum
			}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				this.storeList = data.body.data.data;
				this.storeTotal = data.body.data.totalRecords;

				this.getMapPos(this.storeList[0].address); // 获取经纬度
				this.mapTitle = this.storeList[0].name;
				this.mapAddress = this.storeList[0].address;

				// 翻页器
				$('.storePaging').pagination({
					pageCount: data.body.data.totalPages,
					coping: true,
					mode: 'fixed',
					activeCls: 'activeCls',
					homePage: '首页',
					endPage: '尾页',
					prevContent: '<img src="../build/images/prevPage.png"/>',
					nextContent: '<img src="../build/images/nextPage.png"/>',
					callback: function(api) {
						xxtygMain.storeNowPageNum = api.getCurrent();

						xxtygMain.$http.post('http://localhost:8083/zujahome-main/experience/showStoreList', {
							pageNum: xxtygMain.storeNowPageNum
						}, {
							headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							emulateJSON: true
						}).then(function(data) {
							// 每次翻页默认选中第一个门店
							$('.appointmentWrap .appointment').css('background', '#cd2f1d');
							$('.appointmentWrap .appointment').first().css('background', '#b31200');

							xxtygMain.storeList = data.body.data.data;

							this.getMapPos(this.storeList[0].address); // 获取经纬度
							this.mapTitle = this.storeList[0].name;
							this.mapAddress = this.storeList[0].address;
						}, function(a) {
							console.log('请求错误 ');
						});
					}
				});
			}, function(a) {
				console.log('请求错误 ')
			});
		},
		showActivityList: function() { // 近期活动
			this.$http.post('http://localhost:8083/zujahome-main/experience/showActivityList', {
				pageNum: this.activityNowPageNum
			}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				this.activityList = data.body.data.data;

				// 翻页器
				$('.paging').pagination({
					pageCount: data.body.data.totalPages,
					coping: true,
					mode: 'fixed',
					activeCls: 'activeCls',
					homePage: '首页',
					endPage: '尾页',
					prevContent: '<img src="../build/images/prevPage.png"/>',
					nextContent: '<img src="../build/images/nextPage.png"/>',
					callback: function(api) {
						xxtygMain.activityNowPageNum = api.getCurrent();

						xxtygMain.$http.post('http://localhost:8083/zujahome-main/experience/showActivityList', {
							pageNum: xxtygMain.activityNowPageNum
						}, {
							headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							emulateJSON: true
						}).then(function(data) {
							xxtygMain.activityList = data.body.data.data;
						}, function(a) {
							console.log('请求错误 ')
						});
					}
				});

				// 设置翻页距左边距离
				$('.pagingWrap .paging').css({
					'margin-left': ($('.pagingWrap').width() - $('.pagingWrap .paging').width()) / 2 + 'px'
				});
			}, function(a) {
				console.log('请求错误 ')
			});
		},
		activityFn: function(val, who) { // 近期活动
			this.activity = val;

			// 设置遮罩层高度
			setTimeout(function() {
				console.log(document.body.scrollHeight);
				$('.xxtygMask').css({
					'width': $(document).width() + 'px',
					'height': document.body.scrollHeight + 'px'
				});
			}, 100);

			if(who == '1') { // 近期活动
				this.$http.post('http://localhost:8083/zujahome-main/other/drawFree', {
					name: this.activeName,
					phone: this.activePhone,
					typeId: '4' // 1 预约免费设计 2 领取装修方案 3 体验馆预约 4 筑家优品活动报名
				}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function(data) {
					if(data.body.status == '200') {
						alert('活动报名成功');
						this.activity = false;
					} else {
						alert(data.body.msg);
					}
				}, function(a) {
					console.log('请求错误 ')
				});
			} else if(who == '0') {
				this.activity = val;
				this.activeName = '';
				this.activePhone = '';
			} else {
			}
		},
		experienceFn: function(val, who) { // 体验馆预约
			// 设置遮罩层高度
			setTimeout(function() {
				$('.xxtygMask').css({
					'width': $(document).width() + 'px',
					'height': document.body.scrollHeight + 'px'
				});
			}, 100);

			if(who == '1') { // 点击立即领取按钮
				this.$http.post('http://localhost:8083/zujahome-main/other/drawFree', {
					name: this.freeName,
					phone: this.freePhone,
					typeId: '3' // 1 预约免费设计 2 领取装修方案 3 体验馆预约 4 筑家优品活动报名
				}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function(data) {
					if(data.body.status == '200') {
						alert('预约成功');
						this.experience = false;
					} else {
						alert(data.body.msg);
					};
				}, function(a) {
					console.log('请求错误 ')
				});
			} else {
				this.experience = val;
			}
		}
	}
});

$(function() {
	$('.toPage a').css('color', '#333');
	$('.toPage .xxtyg a').css('color', '#cd2f1d');
});