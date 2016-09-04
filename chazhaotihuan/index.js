window.onload = function() {
	var txt = document.getElementById('txt');
	var p = document.getElementById('pbox');
	var span = document.getElementsByTagName('span')[0];
	var input = document.getElementsByTagName('input');
	var findBtn = document.getElementsByClassName('find');
	var replaceBtn = document.getElementsByClassName('replace');
	var sureFind = document.getElementById('surefind');
	var findText = document.getElementById('findtext');
	var sureReplace = document.getElementById('surereplace');
	var oldText = document.getElementById('old');
	var newText = document.getElementById('new');
	var li = document.getElementsByTagName('li');
	var bottomDiv = document.getElementById('bottom');
	var b = document.getElementsByTagName('b')[0];
	//保存输入的内容
	var txtInfo = '';
	//保存要查找的字符
	var a = '';
	//把输入的内容转存起来
	var arrb = '';
	//保存要被替换掉的字符
	var c = '';
	//保存要替换成的字符
	var d = '';
	//要操作的字符所在的位置的下标
	var num = 0;
	//提交按钮的开关
	var txtOnoff = true;
	//展开按钮的开关
	var onOff1 = true;
	//提交按钮的点击事件
	span.onclick =function() {
		if(txtOnoff) {
			if( txt.value == '') {
				alert('请输入内容');
			}else{
				//把提交的内容存起来,让textarea消失，p显示
				p.innerHTML = arrb = txtInfo = txt.value;
				txtOnoff = false;
				txt.className = 'hidden';
				p.className = 'show';
				alert('提交成功');
			}
		}else{
			alert('已经提交过了');
		}
	}
	//展开按钮的点击事件
	input[0].onclick =function() {
		if(txtOnoff == false) {
			if(onOff1) {
				show('show','关闭',false);
			}else{
				show('hidden','展开',true);
			}
		}else{
			alert('请先输入内容');
		}
	}
	//小叉号的点击事件
	b.onclick = function() {
		show('hidden','展开',true);
	}
	//控制功能区域的显示或隐藏的函数
	function show(a,b,c) {
		bottomDiv.className = a;
		input[0].value = b;
		input[1].className = a + ' find';
		input[2].className = a + ' replace';
		onOff1 = c;
		for (var i = 0; i < input.length; i++) {
			input[i].style.backgroundColor = '';
		}
	}
	
	
	for (var i = 0; i < findBtn.length; i++) {
		findBtn[i].onclick =function() {
			find();
		}
		replaceBtn[i].onclick =function() {
			replace();
		}
	}
	
	function find() {
		for (var i = 0; i < findBtn.length; i++) {
			findBtn[i].style.backgroundColor = 'pink';
			replaceBtn[i].style.backgroundColor = '';
		}
		li[0].className = 'show';
		li[1].className = 'hidden';
	}
	function replace() {
		for (var i = 0; i < findBtn.length; i++) {
			findBtn[i].style.backgroundColor = '';
			replaceBtn[i].style.backgroundColor = 'pink';
		}
		li[1].className = 'show';
		li[0].className = 'hidden';
	}
	
	sureFind.onclick = function() {
		if(findText.value == '') {
			alert('请输入查找的内容');
		}else{
			a = findText.value;
			arrb = txtInfo.split(a).join('<strong style="background-color:red">'+a+'</strong>');
			p.innerHTML = arrb;
			console.log(p.innerHTML);
			console.log(txtInfo);
		}
	}
	sureReplace.onclick = function() {
		if(oldText.value == '' || newText.value == '') {
			alert('请输入替换的内容');
		}else{
			p.innerHTML = txtInfo;
			c = oldText.value;
			d = newText.value;
			arrb = txtInfo.split(c).join('<strong style="background-color:red">'+d+'</strong>');
			txtInfo = txtInfo.split(c).join(d);
			p.innerHTML = arrb;
		}
	}
}
