window.onload = function () {
	var form = document.getElementById('form1');
	var tab1 = document.getElementById('tab1');
	var tBody = tab1.tBodies[0];
	var trList = tBody.rows;
	var bigBox = document.getElementById('bigBox');
	var box = document.getElementById('box');
	//id编号
	var num = 0;
	//全选按钮
	var allCheckedBox = tab1.tHead.rows[0].cells[0].children[0];
	//获取所有tBody下面的td（要bigBox.style.display = 'none';被搜索的数据）
	var tBodyAllTd = tBody.getElementsByTagName('td');
	
	//当btn1点击时，创建td，获取输入框里面的值，然后付给td
	form.btn1.onclick = function() {
		var name = form.username.value;
		var sex = form.sex.value;
		var age = form.age.value;
		//判断里面的值是否为空
		if(!name){
			alert("请输入姓名");
		}else if(!age || isNaN(age) || Number(age) < 0){
			alert("请输入正确的年龄");
		}else{
			//调用创建表格函数
			creatTd(num,name,sex,age);
		}
	}
	//创建表格函数
	function creatTd(userId,userName,userSex,userAge){
		//创建表格
		var tr = document.createElement('tr');
		//当鼠标移入到某行时，变色
		tr.onmouseover = function(){
			this.style.backgroundColor = 'gray';
		}
		//移出时，调用变色函数
		tr.onmouseout = function(){
			trBgcolor();
		}
		var td = document.createElement('td');
		tdmouse();
		function tdmouse(){
			//当鼠标移入到有颜色的td上时，让他回归到tr的颜色
			td.onmouseover = function(){
				this.style.backgroundColor = '';
			}
		}
		var check = document.createElement('input');
		check.type = 'checkbox';
		//如果这个节点是input标签，且是checkbox类型时 点击时
		check.onclick = function(){
			ischeck();
		}
		td.appendChild(check);
		tr.appendChild(td);
		var td = document.createElement('td');
		tdmouse();
		td.innerHTML = userId;
		tr.appendChild(td);
		var td = document.createElement('td');
		tdmouse();
		td.innerHTML = userName;
		tr.appendChild(td);
		var td = document.createElement('td');
		tdmouse();
		td.innerHTML = userSex;
		tr.appendChild(td);
		var td = document.createElement('td');
		tdmouse();
		td.innerHTML = userAge;
		tr.appendChild(td);
		var td = document.createElement('td');
		tdmouse();
		var preBtn = document.createElement('input');
		preBtn.type = 'button';
		preBtn.value = '上移';
		//如果这个节点是input标签，且是button类型时   点击时，让这个元素所在的行整体向上移动
		preBtn.onclick = function(){
			var preele = this.parentNode.parentNode.previousElementSibling;
			if(preele){
				tBody.insertBefore(this.parentNode.parentNode,preele);
			}
		}
		td.appendChild(preBtn);
		var nextBtn = document.createElement('input');
		nextBtn.type = 'button';
		nextBtn.value = '下移';
		//点击时，让这个元素所在的行整体向下移动
		nextBtn.onclick = function(){
			var nextele = this.parentNode.parentNode.nextElementSibling;
			if(nextele){
				tBody.insertBefore(nextele,this.parentNode.parentNode);
			}
		}
		td.appendChild(nextBtn);
		var aDel = document.createElement('a');
		aDel.href = 'javascript:;';
		aDel.innerHTML = '删除';
		//当a点击时，清除这一行，调用变色函数
		aDel.onclick = function(){
			var eleNode = this;
			alertBox('删除提示','确定要删除吗？');
			var btn1 = box.children[2];
			var btn2 = box.children[3];
			btn1.onclick = function(){
				tBody.removeChild(eleNode.parentNode.parentNode);
				bigBox.style.display = 'none';
				ischeck();
				trBgcolor();
			}
			btn2.onclick = function(){
				bigBox.style.display = 'none';
			}
		}
		td.appendChild(aDel);
		tr.appendChild(td);
		//最后把生成的表格一次性付给tBody
		tBody.appendChild(tr);
		num++;
		//每次新增完成后，都把全选设为false
		allCheckedBox.checked = false;
	}
	//当全选按钮点击后，所有的都选中,变色
	allCheckedBox.onclick = function(){
		for (var i = 0; i < trList.length; i++) {
			//获取所有的单选框
			var trFirstInput = tBody.rows[i].cells[0].children[0];
			//如果全选按钮勾选，则所有的单选按钮都勾选，否则都不勾选，再次调用变色函数
				trFirstInput.checked = this.checked;
				trBgcolor();
		}
	}
	//点击单选框时，判断是不是要勾选全选的函数
	function ischeck(){
		for (var i = 0; i < trList.length; i++) {
			//获取所有的单选框
			var allCheck = trList[i].children[0].children[0].checked;
			//当有一个没有被选中，则全选按钮不勾选，直接return，否则就勾选全选按钮
			if(!allCheck){
				tab1.tHead.rows[0].cells[0].children[0].checked = false;
				return;
			}else{
				tab1.tHead.rows[0].cells[0].children[0].checked = true;
			}
		}
	}
	//隔行换色，有选中的话，需要给一个别的颜色
	function trBgcolor(){
		for (var i = 0; i < trList.length; i++) {
			if (i % 2 == 0){
				trList[i].style.backgroundColor = 'pink';
			}else{
				trList[i].style.backgroundColor = '#fff';
			}
			var ischecked = trList[i].children[0].children[0].checked;
			if(ischecked){
				trList[i].style.backgroundColor = 'burlywood';
			}
		}
	}
	//点击排序按钮后
	form.btn2.onclick = function() {
		//获取前面的value值，根据用户选择的排序要求，进行排序
		var idOrAge = form.sort.value;
		var isOrder = form.order.value;
		
		if(idOrAge == '编号'){
			tabSort(1,isOrder);
		}else{
			tabSort(4,isOrder);
		}
		//拍完序后，重新调用隔行换色函数
		trBgcolor();
	}
	//点击搜索按钮的时候
	form.btn3.onclick = function() {
		
		var searchInfo = form.find.value;
		var family = form.family.value;
		//先判断有没有输入搜索内容
		if(searchInfo){
			for (var i = 0; i < tBodyAllTd.length; i++) {
				//让所有的td颜色都没有
				tBodyAllTd[i].style.backgroundColor = "";
			}
			if(family == '全部'){
				for (var i = 0; i < tBodyAllTd.length; i++) {
					if(tBodyAllTd[i].innerHTML.indexOf(searchInfo) != -1){
						tBodyAllTd[i].style.backgroundColor = 'red';
					}
				}
			}else if(family == 'ID'){
				searchFn(1,searchInfo);
			}else if(family == '姓名'){
				searchFn(2,searchInfo);
			}else if(family == '性别'){
				searchFn(3,searchInfo);
			}else{
				searchFn(4,searchInfo);
			}
		}else{
			alert('请输入要搜索的内容');
		}
	}
	//搜索函数
	function searchFn(num,searchText){
		for (var j = 0; j < trList.length; j++) {
			if(trList[j].cells[num].innerHTML.indexOf(searchText) != -1){
				//谁被选中了，谁加颜色
				trList[j].cells[num].style.backgroundColor = 'red';
			}
		}
	}
	//弹出框函数
	function alertBox(a,b) {
		bigBox.style.display = 'block';
		//获取可视窗口大小
		var clientW = document.documentElement.clientWidth;
		var clientH = document.documentElement.clientHeight;
		//获取盒子的大小
		var boxW = box.offsetWidth;
		var boxH = box.offsetHeight;
		//让盒子居中显示
		box.style.cssText = 'left:'+ (clientW-boxW)/2 +'px;top:'+ (clientH-boxH)/2 +'px';
		box.children[0].innerHTML = a;
		box.children[1].innerHTML = b;
	}
	//表格排序函数
	function tabSort(tdNum,order){
		//新建一个空数组,用来存放获取的id或者年龄
		var arr = [];
		console.log(arr);
		//a变量用来跟数组里面的每个值比较后，排序自增
		var a = 0;
		for (var i = 0; i < trList.length; i++) {
			//获取所有的编号
			var userInfo = parseFloat(tBody.rows[i].cells[tdNum].innerHTML);
			arr.push(userInfo);
		}
		console.log(arr);
		if(order == '升序'){
			arr.sort(function(a,b){
				return a-b;
			})
		}else{
			arr.sort(function(a,b){
				return b-a;
			})
		}
		for (var i = 0; i < arr.length; i++) {
			//j = a;可以防止有重复的数据在比较时的问题
			for(var j =a; j<trList.length; j++ ){
				//当有用户的数据跟数组里面的数据一样时，就把这一行往前面放，跳出这个循环，然后再拿数组的下一个来比较
				if(arr[i] == tBody.rows[j].cells[tdNum].innerHTML){
					tBody.insertBefore(tBody.rows[j],tBody.rows[a]);
					a++;
					break;
				}
			}
		}
	}
}
