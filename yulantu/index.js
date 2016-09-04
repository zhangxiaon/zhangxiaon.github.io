window.onload = function(){
	var box = document.getElementById('box');
	var mask = document.getElementById('mask');
	var small = document.getElementById('small');
	var box2 = document.getElementById('box2');
	var big = document.getElementById('big');
	
	var boxInfo = box.getBoundingClientRect();
	
	box.onmouseover = function(){
		mask.style.display =  box2.style.display = 'block';
	}
	box.onmouseout = function(){
		mask.style.display = box2.style.display = 'none';
	}
	//鼠标移动时，得出鼠标距离可视区域的左边的上边的距离，把这个距离付给mask
	box.onmousemove = function(e){
		var l = e.clientX - boxInfo.left - mask.offsetWidth/2;
		var t = e.clientY - boxInfo.top - mask.offsetHeight/2;
		if(l < 0){
			l = 0;
		}else if(l > box.clientWidth - mask.offsetWidth){
			l = box.clientWidth - mask.offsetWidth;
		}
		if(t < 0){
			t = 0;
		}else if(t > box.clientHeight - mask.offsetHeight){
			t = box.clientHeight - mask.offsetHeight;
		}
		mask.style.left = l + 'px';
		mask.style.top = t + 'px';
		big.style.left = (big.offsetWidth - box2.clientWidth)*l/(mask.offsetWidth - box.clientWidth) + 'px';
		big.style.top = (big.offsetHeight - box2.clientHeight)*t/(mask.offsetHeight - box.clientHeight) + 'px';;
	}
	
}
