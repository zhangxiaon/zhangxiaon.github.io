window.onload = function(){
	var tab = document.getElementById('tab');
	var box = document.getElementById('box');
	var boxDiv = box.getElementsByTagName('div');
	var tBody = tab.getElementsByTagName('tbody')[0];
	var p = document.getElementsByTagName('p');
	var span = document.getElementsByTagName('span')[0];
	var lastBtn = document.getElementById('last');
	var nextBtn = document.getElementById('next');
	var tds = document.getElementsByTagName('td');
	//定时器的变量
	var timer = null;
	//页面时间
	var d = new Date();
	
	//给box里面生成年份列表
	var str = '';
	for (var i = 2130; i >= 1970; i--) {
		if(i == d.getFullYear()) {
			str += '<div style="background-color:red">'+i+'</div>';
		}else{
			str += '<div>'+i+'</div>';
		}
	}
	box.innerHTML = str;
	
	//当前时间初始化
	nowTime();
	//每一秒中执行一次
	timer = setInterval(nowTime,1000);
	//生成当前时间
	function nowTime() {
		var d = new Date();
		p[0].innerHTML = zero(d.getHours()) + ':' + zero(d.getMinutes()) + ':' + zero(d.getSeconds());
		p[1].innerHTML = d.getFullYear() + '年' + zero(d.getMonth() + 1) + '月' + zero(d.getDate()) + '日,星期' + whoday(d.getDay());
		//根据当前时间自动调换td背景颜色
		for (var i = 0; i < tds.length; i++) {
			tds[i].style.backgroundColor = '';
			if(parseFloat(tds[i].innerHTML) == d.getDate() && m == d.getMonth() && y == d.getFullYear()){
				tds[i].style.backgroundColor = 'red';
			}
		}
	}
	//当数值小于10时，在前面补一个0；
	function zero(value) {
			if(value < 10) {
				value = '0' + value;
				return value;
			}else{
				return value;
			}
		}
	//改变星期的值为汉字
	function whoday(v) {
		return ['日','一','二','三','四','五','六',][v]
	}
	
	
	//表格初始化
	var clickTime = new Date();
	var y = d.getFullYear();
	var m = d.getMonth();
	auto();
	
	
	//给按钮添加点击事件
	lastBtn.onclick = function() {
		//没点击一次，月份减一 ，set给clickTime
		m = clickTime.getMonth() - 1;
		y = clickTime.getFullYear();
		clickTime.setMonth(m);
		auto();
	}
	//给按钮添加点击事件
	nextBtn.onclick = function() {
		//没点击一次，月份加一 ，set给clickTime
		m = clickTime.getMonth() + 1;
		y = clickTime.getFullYear();
		clickTime.setMonth(m);
		auto();
	}
	//给span添加点击事件,点击后box显示
	span.onclick = function() {
		box.style.display = 'block';
	}
	
	
	
	//给box里面的div添加鼠标移入,移出事件，点击事件
	//鼠标移入时改变边框颜色，离开后恢复之前的颜色
	var divHtml = '';
	for (var i = 0; i < boxDiv.length; i++) {
		boxDiv[i].onmouseover = function () {
			this.style.border = '1px solid red';
		}
		boxDiv[i].onmouseout = function () {
			this.style.border = '1px solid black';
		}
		
		//鼠标点击后，把里面的innerHtml拿出来,让div消失，如果是当前日期，则当前的日期为红色高亮，否则没有
		boxDiv[i].onclick = function () {
			y = this.innerHTML;
			clickTime.setFullYear(y);
			auto();
			box.style.display = 'none';
		}
	}
	
	//根据时间，自动生成每个月的日期表格函数
	function auto() {
		
		span.innerHTML = clickTime.getFullYear() + '年' + zero(clickTime.getMonth()+1) + '月';
		//一个月有多少天
		function mouthDay(year,mouth) {
			var time = new Date(year,mouth+1,1);
			return new Date(time - 1).getDate();
		}
		//当前月的
		var muchDay = mouthDay(clickTime.getFullYear(),clickTime.getMonth());
		//上一个月的
		var lastMuchDay = mouthDay(clickTime.getFullYear(),clickTime.getMonth()-1);
		//每个月的1号是星期几
		function week(year,mouth) {
			var time = new Date(year,mouth,1);
			return new Date(time).getDay();
		}
		var isWeek = week(clickTime.getFullYear(),clickTime.getMonth());
		
		//每个月有几行
		row = Math.ceil((isWeek + muchDay)/7);
		
		//根据每个月一号是周几，把日期按顺序排列到表格里面
		var num = 1 - isWeek;
		//for循环生成表格
		var tbodyHtml = '';
		for (var i = 0; i < row; i++) {
			tbodyHtml += '<tr>';
			for (var j = 0; j < 7; j++) {
				if(num < 1) {
					tbodyHtml += '<td style="color:#999">'+ (lastMuchDay + num) +'</td>';
				}else if (num > muchDay){
					tbodyHtml += '<td style="color:#999">' + (num - muchDay) + '</td>';
				}else{
					if(num == d.getDate() && m == d.getMonth() && y == d.getFullYear()){
						tbodyHtml += '<td style="background-color:red">' + num + '</td>';
					}else{
						tbodyHtml += '<td>' + num + '</td>';
					}
				}
				num++;
			}
			tbodyHtml += '</tr>'
		}
		tBody.innerHTML = tbodyHtml;
		//给tab添加鼠标移入移出事件，鼠标移入时改变边框颜色，离开后恢复之前的颜色
		for (var i = 0; i < tds.length; i++) {
			var isTd = null;
			tds[i].index = i;
			tds[i].onmouseover = function () {
				this.style.border = '1px solid red';
			}
			tds[i].onmouseout = function () {
				if(isTd == this.index) {
					this.style.border = '1px solid blue';
				}else{
					this.style.border = '1px solid pink';
				}
			}
			tds[i].onclick = function () {
				if(isTd !== null){
					tds[isTd].style.border = '1px solid pink';
				}
				this.style.border = '1px solid blue';
				isTd = this.index;
			}
		}
	}
}
