// 注册
var personalDataMain = new Vue({
	el: '.personalDataMain',
	data: {
		customHeadBox: false, // 编辑头像弹框
		nickname: '',
		realname: '',
		headp: '',
		sex: '',
		birthday: '',
		userDetails: '', // 用户信息
	},
	mounted: function() {
		// 展示用户的详细信息
		this.$http.post('http://localhost:8083/zujahome-main/user/showUserDetail', {}, { // 没有参数也要放空的大括号
			headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			emulateJSON: true
		}).then(function(data) {
			if(data.body.status == '200') {
				this.userDetails = data.body.data;
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
					'background-image': 'url(' + this.headp + ')'
				});
			} else {
				alert(data.body.msg);
			}

			console.log(data.body.data);
		}, function(a) {
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
		editHeadImg: function(val, who) { // 点击编辑头像
			this.customHeadBox = val;
			
			// 一定要注意，这种插件的初始化一定是在这个元素存在之后
			if(val) {
				setTimeout(function() {
					// 遮罩层默认样式
					$('.mask').css({
						'width': $(document).width() + 'px',
						'height': document.body.scrollHeight + 'px'
					});
					
					var clipArea = new bjj.PhotoClip("#clipArea", {
						size: [260, 260],
						outputSize: [640, 640],
						file: "#fromLocalFile",
						view: ".viewClipPic",
						ok: "#clipBtn",
						loadStart: function() {
							console.log("照片读取中");
						},
						loadComplete: function() {
							console.log("照片读取完成");
						},
						clipFinish: function(dataURL) {
							personalDataMain.headp = dataURL;
						}
					});
				}, 100);
			}

			if(who == '1') { // 保存
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
				}).then(function(data) {
					if(data.body.status == '200') {
						alert('头像保存成功')
					} else {
						alert(data.body.msg);
					}
				}, function(a) {
					console.log('请求错误 ')
				});
			};
		},
		completeUserInfo: function() { // 完善用户信息
			if($('#man').prop('checked')) { // 男1   女0
				this.sex = '1';
			} else {
				this.sex = '0';
			}

			this.birthday = $('#birthdayDate').val();
			
			this.$http.post('http://localhost:8083/zujahome-main/user/completeUserInfo', {
				nickname: this.nickname,
				realname: this.realname,
				sex: this.sex,
				birthday: this.birthday,
			}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				if(data.body.status == '200') {
					 window.location.reload();
				} else {
					alert(data.body.msg);
				}
			}, function(a) {
				console.log('请求错误 ');
			});
		}
	}
});

$(function() {
	//执行一个laydate实例
	laydate.render({
		elem: '#birthdayDate' //指定元素
	});
});