// 页面跳转
var toPage = new Vue({
	el : '.toPage',
	data : {
		toPagesArr : {
			index:'index.html',
			zjyp : 'zjyp.html',
			ypzp : 'ypzp.html',
			ptfa : 'ptfa.html',
			zjshj : 'zjshj.html',
			zjfs : 'zjfs.html',
			zjh : 'zjh.html',
			zzyjm : 'zzyjm.html'
		}
	},
	mounted : function(){
		
	},
	methods : {
		
	}
});

// 分页
var paging = new Vue({
	el : '.paging',
	data : {
	},
	mounted : function(){
		
	},
	methods : {
		
	}
});

//日期格式化，精确到年月日
Vue.filter('dateFormat', function(value) { //value为13位的时间戳
	function add0(m) {
		return m < 10 ? '0' + m : m
	}
	var time = new Date(parseInt(value));
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();

	return y + '.' + add0(m) + '.' + add0(d);
});

//日期格式化，精确到年月日时分秒
Vue.filter('timestampToTime',function(value){
    var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
});

(function(doc) {
	function changeSize() {
		var size = doc.documentElement.clientWidth / 128;
		doc.querySelector('html').style.fontSize = size + 'px';
	}
	//用户缩放浏览器窗口大小时
	window.onresize = changeSize;
	changeSize();
	
	// 鼠标移入移出筑家汇
	$('.toPage .zjh,.zjhSubtitle').on({
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
	});
})(document);