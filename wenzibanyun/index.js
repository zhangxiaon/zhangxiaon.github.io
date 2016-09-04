window.onload = function() {
	var boxText = document.getElementsByTagName('textarea');
	var span = document.getElementsByTagName('span');
	var btn = document.getElementsByTagName('input');
	var p = document.getElementsByTagName('p')[0];
	var txt = '';
	var txt1 = '';
	var i = 0;
	var j = 0;
	var num = 0;
	var timer = null;
	var onOff = true;
	var onOffb = true;
	var onOffp = true;
	p.onclick = function() {
		if(boxText[0].value != ''){
			if(onOffp) {
				txt = boxText[0].value;
				num = txt.length;
				span[0].innerHTML = num;
				span[1].innerHTML = 0;
				onOffp = false;
			}
		}else{
			alert('请输入内容');
		}
		
		
	}
	//点击btn【0】时，如果开关开的，再判断i有没有自增到最大，如果到最大了，表示已经完成，否则开始搬运，当i自增到最大时，=表示完成了，关闭定时器
	//如果开关关了，再判断i有没有自增到最大，如果到最大了，表示已经完成，否则，关闭定时器，把开关打开
	btn[0].onclick = function() {
		//判断是否为空，
		if(txt != '') {
			//不为空的话，再判断开关
			if(onOff) {
				//开关打开的话，再判断i有没有自增到最大，如果到最大了，表示已经完成，
				if(i == num){
					clearInterval(timer);
					btn[0].value = '完成';
				}else{
					//否则开始搬运
					btn[0].value = '停止';
					timer = setInterval (function() {
						boxText[1].value += txt.charAt(i);
						boxText[0].value = txt.slice(i+1);
						txt1 = boxText[1].value;
						span[0].innerHTML = (txt.length-(i+1)) + ' / ' + num;
						span[1].innerHTML = i+1;
						i++;
						//当搬运完成后，关闭定时器，让j等于0，把下面的按钮开关打开
						if(i == num){
							clearInterval(timer);
							btn[0].value = '完成';
							j = 0;
							btn[1].value = '<——';
							onOffb = true;
						}
					},100)
					onOff = false;
					}
			}else{
				//开关关闭的话，再判断i有没有自增到最大，如果到最大了，表示已经完成，否则关闭定时器，把开关打开
				if(i == num){
					clearInterval(timer);
					btn[0].value = '完成';
				}else{
					clearInterval(timer);
					btn[0].value = '继续';
					onOff = true;
				}
			}
		//空的话提示输入内容
		}else{
			alert('请输入内容');
		}
	}
	
	btn[1].onclick = function() {
		if(txt1 != '') {
			if(i != num){
				alert('请点击上面的按钮搬运');
			}else{
				if(onOffb) {
					if(j == num){
						clearInterval(timer);
						btn[1].value = '完成';
					}else{
						btn[1].value = '停止';
						timer = setInterval (function() {
							boxText[0].value += txt1.charAt(j);
							boxText[1].value = txt1.slice(j+1);
							span[1].innerHTML = (txt1.length-(j+1)) + ' / ' + num;
							span[0].innerHTML = j+1;
							j++;
							if(j == num){
								clearInterval(timer);
								btn[1].value = '完成';
								span[1].innerHTML = 0;
								i = 0;
								btn[0].value = '——>';
								onOff = true;
							}
						},30)
						onOffb = false;
					}
				}else{
					if(j == num){
						clearInterval(timer);
						btn[1].value = '完成';
					}else{
						clearInterval(timer);
						btn[1].value = '继续';
						onOffb = true;
					}
				}
			}
		}else{
			alert('请输入内容');
		}
		
	}
}
	
