var zjshjMain = new Vue({
	el: '.zjshjMain',
	data: {

	},
	mounted: function() {
		// 省市区要放在定时器里面初始化，因为默认是没有这个元素的
		$('#distpicker4,#distpicker5,#distpicker6').distpicker({
			province: '请选择',
			city: '请选择',
			autoSelect: false
		});
	},
	methods: {
		// 添加一个筑家设计师
		addZJH: function(type) {
			var formData = '';
			var url = '';
			if(type == '1') { // 设计师俱乐部
				formData = new FormData($("#designerForm")[0]);
				url = 'http://localhost:8083/zujahome-main/zujahui/addZujaDesigner';
			} else if(type == '2') { // 工长俱乐部
				formData = new FormData($("#foreMan")[0]);
				url = 'http://localhost:8083/zujahome-main/zujahui/addForeMan';
			} else if(type == '3') { // 家装联盟
				formData = new FormData($("#homedressAliance")[0]);
				url = 'http://localhost:8083/zujahome-main/zujahui/addHomedressAliance';
			} else if(type == '4'){
				formData = new FormData($("#jiabohui")[0]);
				url = 'http://localhost:8083/zujahome-main/zujahui/addJiabohui';
			}
			this.$http.post(url, formData, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function(data) {
				if (data.body.status=='200') {
					alert('恭喜您，加入成功！');
					window.location.reload();
				}else{
					alert(data.body.msg);
				}
			}, function(a) {
				console.log('请求错误 ')
			});
		}
	}
});

$(function() {
	// 筑家汇
	$('.toPage a').css('color', '#333');
	$('.toPage .zjh a').css('color', '#cd2f1d');
});