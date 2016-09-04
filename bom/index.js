window.onload = function(){
	var left = document.getElementsByClassName('left')[0];
	var right = document.getElementsByClassName('right')[0];
	var title = document.getElementsByClassName('title')[0];
	var img = title.getElementsByTagName('img')[0];
	var rightInfo = right.getElementsByClassName('info')[0];
	var rightP = rightInfo.getElementsByTagName('p');
	var yq = document.getElementsByClassName('yq');
	var page = document.getElementsByClassName('pages')[0];
	var pageP = page.getElementsByTagName('p')[0];
	var leftItem = left.getElementsByTagName('ul')[0];
	var leftLi = leftItem.getElementsByTagName('li');
	var leftA = leftItem.getElementsByTagName('a');
	var prevBtn = document.getElementsByClassName('prev')[0];
	var nextBtn = document.getElementsByClassName('next')[0];
	var dataList = aData.list;
	var shInfo = aData.sh;
	var xyInfo = aData.xy;
	var num = 1;
	
	
	if(!window.location.search){
		window.location.href = '?pag='+ dataList[0].lx +'#tab=1';
	}
	
	var search = window.location.search.split('=')[1];
	var hash = window.location.hash.split('=')[1];
	for (var i = 0; i < dataList.length; i++) {
		var li = document.createElement('li');
		var a = document.createElement('a');
		a.href = 'index.html?pag='+ dataList[i].lx +'#tab=1';
		a.innerHTML = dataList[i].text;
		li.appendChild(a);
		leftItem.appendChild(li);
	}
	for (var i = 0; i < leftA.length; i++) {
		leftA[i].index = i;
		leftA.onclick =function(){
			window.loaction.href = '?pag='+ dataList[this.index].lx +'#tab=1';
		}
	}
	if(search == 'sh'){
		leftLi[0].className = 'focus';
		img.src = "img/shzp.gif";
		Fn(shInfo);
	}else{
		leftLi[1].className = 'focus';
		img.src = "img/xyzp.gif";
		Fn(xyInfo);
	}
	
	function Fn(who){
//		window.location.hash = '#tab=' + (num);
		for (var i = 0; i < who.text.length; i++) {
			var p = document.createElement('p');
			p.className = 'zp';
			p.style.display = 'none';
			var span = document.createElement('span');
			var a = document.createElement('a');
			a.href = 'javascript:;';
			a.innerHTML = who.text[i].zw; 
			span.appendChild(a);
			p.appendChild(span);
			var span = document.createElement('span');
			span.innerHTML = '需求人数：' + who.text[i].rs + '名';
			p.appendChild(span);
			var span = document.createElement('span');
			span.innerHTML = who.text[i].sj[0] + '年' + who.text[i].sj[1] + '月' + who.text[i].sj[2] + '号';
			p.appendChild(span);
			rightInfo.appendChild(p);
			var p = document.createElement('p');
			p.style.display = 'none';
			p.className = 'yq';
			p.innerHTML = who.text[i].info[0].l.join('').substr(0,100).split(',') + ' ...... ' +  '<a href="content.html?pag='+search+'#tab='+i+'">查看详情</a>';
			rightInfo.appendChild(p);
		}
		
		var pagesNum = Math.ceil(who.text.length/2);
		
		for (var i = 0; i < pagesNum; i++) {
			var span = document.createElement('span');
			if(i == 0){
				span.className = 'focus';
			}
			var a = document.createElement('a');
			a.href = 'javascript:;';
			a.innerHTML = i+1;
			span.appendChild(a);
			pageP.appendChild(span);
		}
		var pageSpan = pageP.getElementsByTagName('span');
		for (var i = 0; i < pageSpan.length; i++) {
			if(pageSpan[i].className == 'focus'){
				for (var j = 0; j < 4; j++) {
					rightP[i*4 + j].style.display = 'block';
				}
				
			}
			pageSpan[i].index = i;
			pageSpan[i].onclick = function(){
				num = (this.index+1);
				console.log(num);
				window.location.hash = '#tab=' + (this.index + 1);
			}
		}
		prevBtn.onclick = function(){
			console.log(num);
			num--;
			if(num<=0){
				num = pageSpan.length;
			}
			window.location.hash = '#tab=' + num;
		}
		nextBtn.onclick = function(){
			console.log(num);
			num%=pageSpan.length;
			window.location.hash = '#tab=' + (num+1);
			num++;
		}
		window.onhashchange = function(){
			hash = window.location.hash.split('=')[1];
			for (var i = 0; i < rightP.length; i++) {
				rightP[i].style.display = 'none';
			}
			for (var j = 0; j < 4; j++) {
				if(rightP[(hash - 1)*4 + j]){
					rightP[(hash - 1)*4 + j].style.display = 'block';
				}
			}
			for (var k = 0; k < pageSpan.length; k++) {
				pageSpan[k].className = '';
			}
			pageSpan[hash - 1].className = 'focus';
		}
	}
	
	
}
