String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

function get_contextPath(){
	return document.location.protocol + "//" + document.location.host+ "/NewsOnline";
}

function showFavoriteInfo(info){
	if( 'yes'== info.responseText){
		alert("收藏成功!");
	} else{
		alert("收藏失败,请稍后再试!")
	}
	removeDIV();
}
function closeWin(){
	window.opener = null;
	window.open('','_self');
	window.close();
}

function setFavorite(newsId){
	alert("come in");
	var url = get_contextPath() + "/jsp/newsinfo/newsFavoriteFolderAction.do?method=checkNewsFavoriteFolder";
	var n_param = "newsId2=3&newsId=" + newsId;
	fp_sendAjaxRequest(url, 'POST', n_param, '', null, addFavorite);
	addNotes();
}

function addFavorite(s_params){
	var params = s_params.responseText.split(';');
	if(params[0] == '3'){
		var url = get_contextPath() + "/jsp/newsinfo/newsFavoriteFolderAction.do?method=addNewsFavoriteFolder&newsId=" + params[1];
		fp_sendAjaxRequest(url, 'POST', '', '', null, showFavoriteInfo);
	} else if(params[0] == '2'){
		alert('此条新闻已加入您的收藏夹!无需再收藏!');
		
		removeDIV();
	} else if(params[0] == '1'){
		if(confirm('收藏需要先登录，是否立即转向登陆页面?')){
			window.open("http://emis.xj.cmcc","_self");
		}
		removeDIV();
	} else if(params[0] == '0'){
		alert('出错了');
		removeDIV();
	}
}