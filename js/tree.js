//找到id下面的一级子节点
function getChildren(id){
	var arr = [];
	for (var i = 0; i < datas.length; i++) {
		if(datas[i].pid == id){
			arr.push(datas[i])
		}
	}
	return arr;
}
//获取id下面的所有子节点
function getAllChildren(id,level){
	var arr = [];
	var level = level || 0;
	var children = getChildren(id);
	for (var i = 0; i < children.length; i++) {
		children[i].level = level;
		arr.push(children[i]);
		arr = arr.concat(getAllChildren(children[i].id, level+1));
	}
	return arr;
}
//根据id获取对应数据
function getInfo(id){
	for (var i = 0; i < datas.length; i++) {
		if(datas[i].id == id){
			return(datas[i])
		}
	}
}
//获取id的父级
function getParent(id){
	for (var i = 0; i < datas.length; i++) {
		if(datas[i].id == id){
			return (getInfo(datas[i].pid));
		}
	}
}
//获取id的所有父级
function getAllParent(id){
	var arr = [];
	var parent = getParent(id);
	if(parent){
		arr.push(parent);
		arr = arr.concat(getAllParent(parent.id));
	}
	return arr;
}
//获取数据中最大的id
function getMaxId(){
	var MaxId = 0;
	for (var i = 0; i < datas.length; i++) {
		if(datas[i].id > MaxId){
			MaxId = datas[i].id;
		}
	}
	return MaxId;
}


