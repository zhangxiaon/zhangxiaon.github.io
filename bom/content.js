window.onload = function(){
	var left = document.getElementsByClassName('left')[0];
	var right = document.getElementsByClassName('right')[0];
	var rightInfo = right.getElementsByClassName('info')[0];
	var title = document.getElementsByClassName('title')[0];
	var img = title.getElementsByTagName('img')[0];
	var leftItem = left.getElementsByTagName('ul')[0];
	var leftLi = leftItem.getElementsByTagName('li');
	var leftA = leftItem.getElementsByTagName('a');
	var dataList = aData.list;
	var shInfo = aData.sh;
	var xyInfo = aData.xy;
	
	if(!window.location.search){
		window.location.href = 'content.html?pag='+ dataList[0].lx +'#tab=0';
		
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
		contentFn(shInfo,hash)
	}else{
		leftLi[1].className = 'focus';
		img.src = "img/xyzp.gif";
		contentFn(xyInfo,hash)
	}
	
	function contentFn(who,num){
		rightInfo.innerHTML = '';
		var h2 = document.createElement('h2');
		h2.innerHTML = who.text[num].zw;
		rightInfo.appendChild(h2);
		var div = document.createElement('div');
		var jjlist = '<span class="l">招聘公司：' + who.text[num].gs + '</span><span>公司性质：' + who.text[num].xz +
		             '</span><span class="l">职位性质：' + who.text[num].gz + '</span><span>工作地点：' + who.text[num].dd +
		             '</span><span class="l">工作经验：' + who.text[num].jy + '</span><span>学历要求：' + who.text[num].xl +
		             '</span><span class="l">招聘人数：' + who.text[num].rs + '人</span><span>薪资待遇：' + who.text[num].dy +
		             '</span><span class="l">发布日期：' + who.text[num].sj.join('-') + '</span><span>招聘类型：' + who.text[num].lx;
		
		div.innerHTML = jjlist;
		rightInfo.appendChild(div);
		var div = document.createElement('div');
		div.className = 'clear';
		rightInfo.appendChild(div);
		var dl = document.createElement('dl');
		var dt = document.createElement('dt');
		dt.innerHTML = who.text[num].info[0].t;
		dl.appendChild(dt);
		var yqList = who.text[num].info[0].l;
		for (var i = 0; i < yqList.length; i++) {
			var dd = document.createElement('dd');
			dd.innerHTML = yqList[i];
			dl.appendChild(dd);
		}
		rightInfo.appendChild(dl);
		var p = document.createElement('p');
		p.innerHTML = '有意者请投递简历至 :' + aData.email;
		rightInfo.appendChild(p);
	}
	window.onhashchange = function(){
		search = window.location.search.split('=')[1];
		hash = window.location.hash.split('=')[1];
		if(search == 'sh'){
			leftLi[0].className = 'focus';
			img.src = "img/shzp.gif";
			contentFn(shInfo,hash)
		}else{
			leftLi[1].className = 'focus';
			img.src = "img/xyzp.gif";
			contentFn(xyInfo,hash)
		}
	}
	
}
