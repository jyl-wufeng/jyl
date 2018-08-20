function Tools()
{
}

Tools.prototype.alert = function(message){
	alert(message);
}


/*******************************************************************************
 * 名称: changeTrBgcolor
 * 功能: displaytag中鼠标移至行中显示不同背景色
 * 输入: tableId displaytag中table的id,系统中为pageContextList
 * 输出: 无
 * 返回: 无
 ******************************************************************************/
Tools.prototype.changeTrBgcolor = function(tableId){
	if(document.getElementById(tableId) != null){
		var Ptr=document.getElementById(tableId).getElementsByTagName("tr");
		function $() {
		    for (i=1;i<Ptr.length+1;i++) {
		    Ptr[i-1].className = (i%2>0)?"t1":"t2";
		    }
		}
		window.onload=$;
		for(var i=0;i<Ptr.length;i++) {
		    Ptr[i].onmouseover=function(){
		    this.tmpClass=this.className;
		    this.className = "t3";
		    };
		    Ptr[i].onmouseout=function(){
		    this.className=this.tmpClass;
		    };
		}
	}
}

/*******************************************************************************
 * 名称: reSize
 * 功能: 重新设置网页的大小及显示位置
 * 输入: width

 * 输出: 无
 * 返回: 无
 ******************************************************************************/
Tools.prototype.reSize = function(width, height, isMove){
	var showx = screen.availWidth / 2 - width / 2;
	var showy = screen.availHeight / 2 - height / 2;
	if(isMove){
		window.moveTo(showx, showy);
	}
	window.resizeTo(width, height);
}


Tools.prototype.processing = function(){
	var path = window.location.pathname;
	path = path.substring(0, path.indexOf('/', 1))
	$("body").append("<div id='TB_load' align='center'><font style='font-size:12px;color:white'>处理中，请稍候……</font><br><img src='"+path+"/image/common/loadingAnimation.gif' /></div>");
	try {
		if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
			$("body","html").css({height: "100%", width: "100%"});
			$("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
        $("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
      }
		}
		else{//all others
      if(document.getElementById("TB_overlay") === null){
        $("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
      }
    }
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
			$("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
		} else {
			$("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
		}
	}
	catch(e){}

	$('#TB_load').show();//show loader
}

Tools.prototype.stop = function(){
	$("#TB_window").fadeOut("fast",function(){$('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
	$('#TB_load').remove();
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		$("body","html").css({height: "auto", width: "auto"});
		$("html").css("overflow","");
	}
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
		$("#TB_overlay").removeClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
	} else {
		$("#TB_overlay").removeClass("TB_overlayBG");//use background and opacity
	}
}


/*******************************************************************************
 * 名称: selectAllCheckbox
 * 功能: 所以checkbox选择
 * 输入: form对象
 * 输出: 无
 * 返回: 无
 ******************************************************************************/
Tools.prototype.selectAllCheckbox = function (){
	var ccObj = document.getElementById("cc");
	var cbArrayObj = document.getElementsByName("id");
	if (ccObj.checked){
		for (var i = 0; i < cbArrayObj.length; i++){
			if(!cbArrayObj[i].disabled){
				cbArrayObj[i].checked = true;
			}
		}
	}
	else{
		for (var i = 0; i < cbArrayObj.length; i++){
			cbArrayObj[i].checked = false;
		}
	}
};


/*******************************************************************************
 * 名称: openWin
 * 功能: 弹出新窗口
 * 输入: url
 *      width  窗口宽度
 *      height 窗口高度
 * 输出: 无
 * 返回: window 句柄.
 ******************************************************************************/
Tools.prototype.openWin = function (url,title,width,height,x,y,scroll){
	showx = screen.availWidth / 2 - width / 2;
	showy = screen.availHeight / 2 - height / 2;
	if(x){
		showx = x;
	}
	if(y){
		showy = y;
	}
	if(scroll){
		scroll = scroll;
	} else{
		scroll = 'no';
	}
	m_curwin = window.open(url,title,"width="+ width +",height="+ height +",top=" + showy +",left=" + showx + ",directories=no,location=no,menubar=no,resizable=yes,scrollbars=" + scroll +",status=no,titlebar=no,toolbar=no");
	m_curwin.focus();
	return m_curwin;
}

Tools.prototype.showModalDialog = function (url,width,height){

  showx = screen.availWidth / 2 - width / 2;
  showy = screen.availHeight / 2 - height / 2;
  return window.showModalDialog(url,window,"dialogWidth:"+ width +"px;dialogHeight:"+ height +"px;dialogTop:" + showy +"px;dialogLeft:" + showx + "px;directories=no;location=no;menubar=no;resizable=no;scroll=no;status=no;titlebar=no;toolbar=no");
}

/*******************************************************************************
 * 名称: goPage
 * 功能: 页面跳转到第几页
 * 输入: 无
 * 输出: 无
 * 返回: 无
 ******************************************************************************/
Tools.prototype.goPage = function (){
	var pages;
	if(document.all._full){
     	pages = document.all._full.innerText.split("|");
  	}
  	if(document.all._first){
	    pages = document.all._first.innerText.split("|");
	}
  	if(document.all._last){
	    pages = document.all._last.innerText.split("|");
	}
	var pageNumValue = document.forms[0].pageNum.value;
	if(pageNumValue != ""){
        var zzsh = /^[0-9]*[1-9][0-9]*$/g;
        if(!zzsh.test(pageNumValue)){
        	this.showAlert("error.pagecount.error");
			document.forms[0].pageNum.focus();
			return;
        }
	}
	/**
	if(pageNumValue != ""){
		for (i = 0; i < pageNumValue.length; i++){
			ch = pageNumValue.charAt(i);
				if ( (ch <= '0' || ch > '9')) {
					this.showAlert("error.pagecount.error");
					document.forms[0].pageNum.focus();
					return;
				}
		   }
	}
	**/
	var number=document.all.total_page.innerHTML ;
	if(parseInt(pageNumValue) > parseInt(number)){
		this.showAlert("error.pagecount.error");
		return false;
	}
	var url;
    try {
		url = pages[0];
	} catch (e) {
    	this.showAlert("error.pagecount.error");
    	return false;
	}
   	re = /(d\-\d+\-p=)(\d+)/
   	if(re.test(url)){
		t=RegExp.$1
     	url=url.replace(re,t+pageNumValue);
   	}
   	window.location.href=url;
}

 /*******************************************************************************
 * 名称: showAlert
 * 功能: 弹出显示消息的模态窗口
 * 输入: 无
 * 输出: 无
 * 返回: window 句柄.
 ******************************************************************************/
Tools.prototype.showAlert = function(message){
  	this.m_curwin = window;
    var t_path = window.location.pathname;
    t_path = t_path.substring(0, t_path.indexOf('/', 1));
    if(t_path.indexOf('/') != 0){
      t_path='/' + t_path;
    }
    this.showModalDialog(t_path + "/secure/error/info.jsp?message=" + message, 285, 150);
}
/*******************************************************************************
 * 名称: generateNavigation
 * 功能: 用于displayTag翻页
 * 输入: 页数
 * 输出: 无
 * 返回: 无
 ******************************************************************************/
Tools.prototype.generateNavigation = function (per_page_num){
	//左边的信息
  	if(document.all._oneitem || document.all._allitems){
    	document.all.total_page.innerHTML = 1;
    	document.all.cur_page.innerHTML = 1;
	}
  	if(document.all._someitem){
    	var pages = document.all._someitem.innerText.split("|");
	    var total = pages[0];
    	var cur = pages[1];
	    total = total.replace(",", ""); //防止里面的科学技术法中的逗号，形式如：1,100
	    cur = cur.replace(",", "");
	    document.all.total_page.innerHTML = Math.ceil(total / per_page_num);
	    document.all.cur_page.innerHTML = cur;
	}

	//导航信息
	if (document.all._full){
	    var pages = document.all._full.innerText.split("|");
	    this.createLink("list_home", pages[0]);
	    this.createLink("list_pre", pages[1]);
	    this.createLink("list_next", pages[2]);
	    this.createLink("list_end", pages[3]);
	}
	if (document.all._first){
	    var pages = document.all._first.innerText.split("|");
	    this.createLink("list_next", pages[0]);
	    this.createLink("list_end", pages[1]);
	}
	if (document.all._last){
	    var pages = document.all._last.innerText.split("|");
	    this.createLink("list_home", pages[0]);
	    this.createLink("list_pre", pages[1]);
	}
};

/*******************************************************************************
 * 名称: createLink
 * 功能: 生成具体的一个连接地址
 * 输入: 域id
 * 输出: 无
 * 返回: url 连接地址
 ******************************************************************************/
Tools.prototype.createLink = function (id, url){
	var test1 = /[d]-.*-[s]/;
	var test2 = /[d]-.*-[o]/;
	var test3 = /[d]-.*-[st]/;
	var newUrl;

	if (typeof (url) != 'undefined' && url != null){
	    var start = url.indexOf(".action?");
	    if (start != -1){
	      	newUrl = url.substring(0, start + 8);
	      	var parameter = url.substring(start + 8, url.length);
	      	var parameters = parameter.split("&");
	      	for (var i = 0; i < parameters.length; i++){
				var namevalue = parameters[i].split("=");
        		if (namevalue != null && namevalue.length > 1){
	        		if (!(test1.test(namevalue[0]) || test2.test(namevalue[0]) || test3.test(namevalue[0]))){
			            newUrl = newUrl + parameters[i];
						if (i < parameters.length - 1){
				            newUrl = newUrl + "&";
	            		}
          			}
        		}
      		}
    	} else {
      		newUrl = url;
    	}
  	}
  	document.all[id].style.cursor = "hand";
  	if ("a" == document.all[id].tagName.toLowerCase()){
	    document.all[id].href = newUrl;
	} else {
		document.all[id].onclick = new Function("window.location.replace('" + newUrl + "')");
  	}
};

/******************************************************************************
 *
 *
 * 名称: showConfirm
 * 功能: 弹出显示消息的模态窗口
 * 输入: 无
 * 输出: 无
 * 返回: window 句柄.
 ************************************************************************/
Tools.prototype.showConfirm = function (msg, funOK, funCancel, args, path)
{
  this.m_param = new Array();
  this.m_param[0]="";
  if(funOK)
  {
    this.m_param[1] = funOK;
  }
  if(funCancel)
  {
  	this.m_param[2] = funCancel;
  }

  var param = '';
  if(args)
  {
    if(!(args instanceof Array))
    {
      throw new Error('IllegalArgumentException args is not a Array');
    }
    param = '&argslen=' + args.length;
    for(i = 0; i < args.length; i++)
    {
      param = param + '&arg' + i + '=' + encodeURIComponent(args[i]);
    }
  }

  this.m_curwin = window;

  if(!path)
  {
    var t_path = window.location.pathname;

    t_path = t_path.substring(0, t_path.indexOf('/', 1));
    if(t_path.indexOf('/') != 0)//可能获取到的路径不带有/，需要强制的增加/
    {
      t_path='/' + t_path;
    }

    return this.showModalWin(t_path + "/secure/confirm.jsp?msg=" + msg + param, this, 280 , 160);
  }
  else
  {
    return this.showModalWin(path + "?msg=" + msg + param, this, 280, 160);
  }
}

/*******************************************************************************
 * 名称: showModalWin
 * 功能: 弹出模态对话框
 * 输入: url
 *      width  对话框宽度
 *      height 对话框高度
 * 输出: 无
 * 返回: window 句柄.
 ******************************************************************************/
Tools.prototype.showModalWin = function (sUrl, vArguments, iWidth, iHeight)
{
  sFeatures="dialogWidth="+iWidth+"px;dialogHeight="+iHeight+"px;help=no;status=no;scroll=yes";

  if (sUrl.indexOf("?") == -1)
  {
    sUrl += "?time=" + this.getCurrentTime() + Math.random();
  }
  else
  {
    sUrl += "&time=" + this.getCurrentTime() + Math.random();
  }
  return window.showModalDialog(sUrl, vArguments, sFeatures);
};

/*******************************************************************************
 * 名称: getCurrentTime
 * 功能: 取得当前时间
 * 输入: 无
 * 输出: 无
 * 返回: String
 ******************************************************************************/
Tools.prototype.getCurrentTime = function()
{
  var  oNow  =  new Date()
  var  hours  =  oNow.getHours()
  var  minutes  =  oNow.getMinutes()
  var  seconds  =  oNow.getSeconds()
  var  timeValue  =  hours
  timeValue  +=  ((minutes  <  10)  ?  ":0"  :  ":")  +  minutes
  timeValue  +=  ((seconds  <  10)  ?  ":0"  :  ":")  +  seconds
  return timeValue
};


/*******************************************************************************************************************************
	对checkbox的操作 add by  taojiang    begin
*******************************************************************************************************************************/

/*******************************************************************************
 * 名称: selectAllCheckbox
 * 功能: 所以checkbox选择
 * 输入: form对象
 * 输出: 无
 * 返回: 无
 ******************************************************************************/
Tools.prototype.selectAllCheckbox = function (oForm)
{
  if(!oForm)
  {
    return;
  }

  if (oForm.cb.checked)
  {
    if (oForm.chb.length > 1)
    {
      for (var i = 0; i < oForm.chb.length; i++)
      {
        oForm.chb[i].checked = true;
      }
    }
    else
    {
      oForm.chb.checked = true;
    }
  }
  else
  {
    if (oForm.chb.length > 1)
    {
      for (var i = 0; i < oForm.chb.length; i++)
      {
        oForm.chb[i].checked = false;
      }
    }
    else
    {
      oForm.chb.checked = false;
    }
  }
};

//隐藏查询条件js
function disposeNode(t_node, s_tableId){
	var t_table = document.getElementById(s_tableId);
	if(t_table!=null){
	var t_path = window.location.pathname;
    t_path = t_path.substring(0, t_path.indexOf('/', 1));
	if(t_node!=null && t_table!=null){
		if (t_table.style.display == ""){
			t_node.src = t_path+"/image/mywork/innerpage-right-line_up.gif";
			t_table.style.display = "none";
		}else{
			t_node.src = t_path+"/image/mywork/innerpage-right-line.gif";
			t_table.style.display = "";
		}
		//parent.frameResize();
	}
	}
}
/*******************************************************************************
 * 名称: getCheckboxValues
 * 功能: 取得Checkbox的值.
 * 输入: 无
 * 输出: 无
 * 返回: string
 ******************************************************************************/
Tools.prototype.getCheckboxValues = function (checkboxGroup)
{
  if(typeof(checkboxGroup[0]) == 'undefined')
  {
    if(checkboxGroup.checked)
    {
      return checkboxGroup.value;
    }
  }
  else
  {
    var retValue = '';
    for(i=0; i < checkboxGroup.length; i++)
    {

      if(checkboxGroup[i].checked)
      {
      	if(retValue == '')
      	{
          retValue = checkboxGroup[i].value;
      	}
        else
        {
          retValue = retValue + ',' + checkboxGroup[i].value;
        }
      }
    }

    return retValue;
  }

  return '';
}


/*******************************************************************************
 * @名称: openDocument
 * @功能: 打开文档
 * @输入: sURL 打开文档的action地址
 * @输出: 无
 * @返回: 无
 ******************************************************************************/
Tools.prototype.openDocument = function(sURL) {
	var t_path = window.location.pathname;

	t_path = t_path.substring(0, t_path.indexOf('/', 1));
	if (t_path.indexOf('/') != 0) {
		t_path = '/' + t_path;
	}
	var t_random = (Math.random() + "").substring(2);

	this.openWin(t_path + "/jsp/frame/loading.jsp", t_random, 500, 300, null,
			false);

	var oForm = document.createElement("FORM");
	document.body.appendChild(oForm);

	oForm.action = sURL;
	oForm.target = t_random;
	oForm.method = "post";
	oForm.submit();

	document.body.removeChild(oForm);
}
Tools.prototype.alert = function(message)
{
	alert(message);
}
Tools.prototype.confirm = function(message)
{
	return confirm(message);
}
Tools.prototype.extendedopen = function(sURL, sName, sFeatures, bReplace)
{
	if(!sURL)
	{
		sURL = '';
	}
	if(!sName)
	{
		sName = '';
	}
	if(!sFeatures)
	{
		sFeatures = '';
	}
	if(!bReplace)
	{
		bReplace = '';
	}

	var t_bHasChip = false;

	var t_oOpenedList = this.getOpened();

	var t_retWin = window.open(sURL, sName, sFeatures, bReplace);

	for(i = 0; i < t_oOpenedList.length; i++)
	{

		if(t_oOpenedList[i].closed)
		{
		  t_oOpenedList[i] = t_retWin;
		  t_bHasChip = true;
		  break;
	  }
	}
	if(!t_bHasChip)
	{
	  t_oOpenedList[t_oOpenedList.length] = t_retWin;
    }

    return t_retWin;
}

/*******************************************************************************
 * 名称: generateNavigationExtend
 * 功能: 用于displayTag翻页  扩展方法
 * 输入: 页数
 * 输出: 无
 * 返回: 无
 ******************************************************************************/
Tools.prototype.generateNavigationExtend = function (pageNo,pageSize,totalNum,url){
	var totalPageNum = Math.ceil(totalNum / pageSize);
	//左边的信息
	try{
		document.all.total_page.innerHTML = totalPageNum;
		document.all.cur_page.innerHTML = pageNo;

		var test = /[d]-[0-9]+-[p]/;
		var newUrl;

		if (typeof (url) != 'undefined' && url != null){
			var start = url.indexOf("Action.do?");
			if (start != -1){
				newUrl = url.substring(0, start + 8);
				var parameter = url.substring(start + 8, url.length);
				var parameters = parameter.split("&");
				for (var i = 0; i < parameters.length; i++){
					var namevalue = parameters[i].split("=");
					if (namevalue != null && namevalue.length > 1){
						if (!test.test(namevalue[0])){
							newUrl = newUrl + parameters[i];
							if (i < parameters.length - 1){
								newUrl = newUrl + "&";
							}
						}
					}
				}
			} else {
				newUrl = url;
			}
		}

		var randNum = parseInt(Math.random()*(9999-1000+1)+9999);
		var linkPage = '&d-' + randNum + '-p=';
		//导航信息
		totalPageNum = parseInt(totalPageNum);
		pageNo = parseInt(pageNo);
		if(totalPageNum == 1){

		}
		if(totalPageNum > pageNo && pageNo == 1){
			//this.createLinkExtend("list_home", newUrl);
			//this.createLinkExtend("list_pre", newUrl + linkPage + (pageNo - 1));
			this.createLinkExtend("list_next", newUrl + linkPage + (pageNo + 1));
			this.createLinkExtend("list_end", newUrl + linkPage + totalPageNum);
		}
		if(totalPageNum > pageNo && pageNo > 1){
			this.createLinkExtend("list_home", newUrl);
			this.createLinkExtend("list_pre", newUrl + linkPage + (pageNo - 1));
			this.createLinkExtend("list_next", newUrl + linkPage + (pageNo + 1));
			this.createLinkExtend("list_end", newUrl + linkPage + totalPageNum);
		}
		if(totalPageNum == pageNo && totalPageNum > 1){
			this.createLinkExtend("list_home", newUrl);
			this.createLinkExtend("list_pre", newUrl + linkPage + (pageNo - 1));
			//this.createLinkExtend("list_next", newUrl + linkPage + (pageNo + 1));
			//this.createLinkExtend("list_end", newUrl + linkPage + totalPageNum);
		}
	} catch(e){}
};

/*******************************************************************************
 * 名称: createLink
 * 功能: 生成具体的一个连接地址
 * 输入: 域id
 * 输出: 无
 * 返回: url 连接地址
 ******************************************************************************/
Tools.prototype.createLinkExtend = function (id, url){
  	document.all[id].style.cursor = "hand";
  	if ("a" == document.all[id].tagName.toLowerCase()){
	    document.all[id].href = url;
	} else {
		document.all[id].onclick = new Function("window.location.replace('" + url + "')");
  	}
};

/*******************************************************************************
 * 名称: goPage
 * 功能: 页面跳转到第几页
 * 输入: 无
 * 输出: 无
 * 返回: 无
 ******************************************************************************/
Tools.prototype.goPageExtend = function (){
	var pageNumValue = document.all.pageNum.value;

	if(pageNumValue != ""){
        var zzsh = /^[0-9]*[1-9][0-9]*$/g;
        if(!zzsh.test(pageNumValue)){
        	this.showAlert("error.pagecount.error");
			document.forms[0].pageNum.focus();
			return;
        }
	}
	/**
	if(pageNumValue != ""){
		for (i = 0; i < pageNumValue.length; i++){
			ch = pageNumValue.charAt(i);
				if ( (ch <= '0' || ch > '9')) {
					this.showAlert("error.pagecount.error");
					document.forms[0].pageNum.focus();
					return;
				}
		   }
	}
	**/
	var number=document.all.total_page.innerHTML ;
	if(parseInt(pageNumValue) > parseInt(number)){
		this.showAlert("error.pagecount.error");
		return false;
	}

	var url = window.location.href;
	var newUrl;
	var test = /[d]-[0-9]+-[p]/;
	if (typeof (url) != 'undefined' && url != null){
	    var start = url.indexOf("Action.do?");
	    if (start != -1){
	      	newUrl = url.substring(0, start + 8);
	      	var parameter = url.substring(start + 8, url.length);
	      	var parameters = parameter.split("&");
	      	for (var i = 0; i < parameters.length; i++){
				var namevalue = parameters[i].split("=");
        		if (namevalue != null && namevalue.length > 1){
	        		if (!test.test(namevalue[0])){
			            newUrl = newUrl + parameters[i];
						if (i < parameters.length - 1){
				            newUrl = newUrl + "&";
	            		}
          			}
        		}
      		}
    	} else {
      		newUrl = url;
    	}
  	}

	var randNum = parseInt(Math.random()*(9999-1000+1)+9999);
	var linkPage = '&d-' + randNum + '-p=';
   	window.location.href = newUrl + linkPage + pageNumValue;
}
