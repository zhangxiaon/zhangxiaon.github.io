window.onload = function() {
	console.log(yundong);
	var btn = document.getElementById('btn');
	var get = document.getElementById('get');
	var lose = document.getElementById('lose');
	var box = document.getElementById('box');
	var box1 = document.getElementById('box1');
	var img = document.getElementsByTagName('img')[0];
	var onOff = true;
	var loseNum = 0;
	var getNum = 0;
	var i = 0;
	var imgOnOff = true;
	//点击btn开始游戏
	btn.onclick = function() {
		if(onOff) {
			onOff = false;
			btn.value = '正在游戏';
			lose.innerHTML = '0分';
			get.innerHTML = '0分';
			btn.style.backgroundColor = '#888';
			move();
		}	
		
	}
	//img的鼠标点下时间
	img.onmousedown = function() {
		if(imgOnOff) {
			imgOnOff = false;
			//清除元素的上一个运动定时器
			clearInterval(img.top);
			//得分项累加
			getNum++;
			get.innerHTML = getNum + '分';
			//变换点击成功的图片
			img.src = 'img/7.jpg';
			//让图片抖动一下,抖动完后再利用回调函数执行（清楚定时器，让图片回归原位，重新开始运动的动作）
			shake(img,'left',30,30,function() {
				clearInterval(img.top);
				img.style.top = '-16px';
				imgOnOff = true;
				gameOver();
			});
		}
		
	}
	//运动函数
	function move() {
		//让img的left值随机生成为0-685；
		leftNum = Math.round(Math.random()*685);
		img.style.left = leftNum + 'px';
		//随机生成img的src的路径
		imgSrc = Math.round(Math.random()*5 + 1);
		img.src = 'img/'+ imgSrc +'.jpg';
		//让运动的时间随着次数增加越来越快
		i = loseNum + getNum;
//		console.log(i);
		duration = 5000 - i *500;
		//让img向下运动，到达最底部后，让loseNum加一，img立刻回归原位置，然后调用抖动函数，抖完后，再次运动；
		yundong(img,'top',260,duration,'linear',function() {
			loseNum++;
			lose.innerHTML = loseNum + '分';
			img.style.top = '-16px';
			shake(box1,'left',30,30,function() {
				gameOver();
			});
		});
	}
	//抖动函数
	function shake(obj,dir,range,time,callback) {
		clearInterval(obj[dir]);
		//获取最初的位置
		var begin = parseFloat(getComputedStyle(obj)[dir]);
		var i = 0;
		var arr = [];
		//生成一个数组，里面是元素依次要移动的位置，分别是一个正数，一个负数
		for (var i = range; i > 0; i-=2) {
			arr.push(i,-i);
			arr.push(0);
		}
		//依次跟数组里面的数字相加，得到元素要移动的位置
		obj[dir] = setInterval(function() {
			obj.style[dir] = arr[i] + begin + 'px';
			i++;
			if(i == arr.length){
				clearInterval(obj[dir]);
				if(typeof callback === 'function') {
					callback();
				}
			}
		},time)
	}
	
	function gameOver() {
		if(loseNum + getNum == 10){
			alert('游戏结束');
			onOff = true;;
			btn.value = '开始游戏';
			btn.style.backgroundColor = '#eee';
			getNum = 0;
			loseNum = 0;
		}else{
			move();
		}
	}
	
}
