window.onload = function() {
	var box = document.getElementsByTagName('div');
	var img = document.getElementsByTagName('img');
	var p = document.getElementsByTagName('p');
	var a = '';
	var b = '';
	function time() {
		//获得当前时间
		var d = new Date();
		var m = new Date();
		m.setSeconds(d.getSeconds() + 1);
		//提取当前时间的时分秒，拼接成字符串
		a = String(zero(d.getHours())) + zero(d.getMinutes()) + zero(d.getSeconds());
		b = String(zero(m.getHours())) + zero(m.getMinutes()) + zero(m.getSeconds());
		
		for (var i = 0; i < img.length; i++) {
			if(i%2 == 0){
				img[i].src = 'img/'+ Number(a.charAt(i/2)) +'.JPG';
			}else{
				img[i].src = 'img/'+ Number(b.charAt(i/2)) +'.JPG';
			}
		}
		
		function zero(value) {
			if(value < 10){
				return value = '0' + value;
			}else{
				return value = value;
			}
		}
		
		
		for (var i = 0; i < a.length; i++) {
			if(a.charAt(i) !== b.charAt(i)){
				chongzhi(i);
			}
		}
		
		function chongzhi(a){
			
			yundong(box[a],'top',-175,500,'linear',function() {
				img[a*2].src = 'img/'+ Number(b.charAt(a)) +'.JPG';
				box[a].style.top = '0px';
			});
		}
	}
	
	time();
	//设置定时器，让奇数span每秒更新一次图片
	timer = setInterval(time,1000 );

}
