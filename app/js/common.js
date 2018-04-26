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
			zzyjm : 'zzyjm.html',
			qwdz : 'qwdz.html',
			yptc : 'yptc.html',
			xxtyg : 'xxtyg.html'
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

//手机号码正则
function checkMobile(val) {
	var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
	return reg.test(val);
}

//邮箱正则
function checkEmail(val) {
	var reg = /^\w+([-+2.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	return reg.test(val);
}

//密码正则，6-18位，包含数字和字母
function checkPwd(val) {
	var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
	return reg.test(val)
}

/**
 * 上传图片预览
 * @param file
 * @returns
 */
function preview(file) {
	var prevDiv = document.getElementsByClassName('nowHeaderPic')[0];
	if(file.files && file.files[0]) {
		var reader = new FileReader();
		reader.onload = function(evt) {
			//prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
			prevDiv.setAttribute("src",evt.target.result);
		}
		reader.readAsDataURL(file.files[0]);
	}
}

/**
 * 时间戳转化时间返回年月日
 * @param shijianchuo
 * @returns
 */
function add1(m){return m<10?'0'+m:m }; 
function getDate(shijianchuo) {  
  //shijianchuo是整数，否则要parseInt转换  
  var time = new Date(shijianchuo);  
  var y = time.getFullYear();  
  var m = time.getMonth()+1;  
  var d = time.getDate();  
  var h = time.getHours();  
  var mm = time.getMinutes();  
  var s = time.getSeconds();  
  return y+'-'+add1(m)+'-'+add1(d);  
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
}    

(function(doc) {
	function changeSize() {
		var size = doc.documentElement.clientWidth / 128;
		doc.querySelector('html').style.fontSize = size + 'px';
	}
	//用户缩放浏览器窗口大小时
	window.onresize = changeSize;
	changeSize();
	
	// 鼠标移入移出家具馆
	$('.jjgWrap,.jjgClassifyBox').on({
		'mouseenter':function () {
			$('.jjgClassifyBox').show();
			
			$('.jjgWrap').css('background','#fff');
			
			$('.jjgWrap a').css({
				'color':'#333'
			});  
			
			$('.jjgWrap h3').css({
				'color':'#cd2f1d'
			});
			
			$('.jjgWrap h3 i').css('background-image','url("images/jjg_hover.png")');
		},
		'mouseleave':function () {
			$('.jjgClassifyBox').hide();
			
			$('.jjgWrap').css('background','transparent');
		
			$('.jjgWrap a').css({
				'color':'#fff'
			});  
			
			$('.jjgWrap h3').css({
				'color':'#fff'
			});
			
			$('.jjgWrap h3 i').css('background-image','url("images/jjg.png")');
		}
	});
	
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