/*******************************************************************************
 * Title : loading.js
 * Description : 生成滚动条
 * Copyright (C) Mocha Software Co.,Ltd.
 *
 * 使用示例：
 *     1.定义全局对象并显示滚动条
 *       var g_loading = new Loading("<span class='word-blue'>处理中...</span>");
 *     2.隐藏滚动条
 *       g_loading.stop();
 *
 * @author niuqk niuqk@mochasoft.com.cn
 * @version Mocha BPM v6.0
 ******************************************************************************/


/*******************************************************************************
 * name: _writeIFrame
 * func: 私有方法. 生成层.
 * in  : none
 * out : none
 * ret : none
 ******************************************************************************/
Loading.prototype._writeIFrame = function()
{
  document.write("<iframe id='loadingIframe' scrolling='no' frameborder='0' style='position:absolute; top:0px; left:0px; display:none;'></iframe>");

  var strLayer = "<div id='loadingdiv' style='position:absolute;width:330px;height:60px;border-width:1;border-style:ridge;background-color:white;padding-top:10px;display:none;z-index:9999'>"
  + "<center>"
  + "<span id='msg'></span>"
  + "<table border='1' width='300' cellspacing='0' cellpadding='0' style='border-collapse:collapse' height='8'>"
  + "	<tr> "
  + "	  <td> "
  + "      <div id='loading' style='overflow:hidden;width=300;'>"
  + "      	<table align=left cellpadding=0 cellspace=0 border=0 >"
  + "      		<tr>"
  + "            <td id='piece' valign='top' >"
  + "            	<div style='width:300;background-color=#ECF2FF'>"
  + "                <table cellspacing='0' cellpadding='0'>"
  + "                  <tr height=8>"
  + "                    <td bgcolor=#8080FF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#6A6AFF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#5555FF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#4040FF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#2B2BFF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#1515FF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#0000FF width=8></td>"
  + "                    <td width=1></td>"
  + "                  </tr>"
  + "                </table>"
  + "              </div>"
  + "            </td> "
  + "            <td id='piece2' valign='top'>"
  + "            	<div style='width:300;background-color=#ECF2FF'>"
  + "                <table cellspacing='0' cellpadding='0'>"
  + "                  <tr height=8>"
  + "                    <td bgcolor=#8080FF width=8></td>"
  + "                    <td width=1></td> "
  + "                    <td bgcolor=#6A6AFF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#5555FF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#4040FF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#2B2BFF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#1515FF width=8></td>"
  + "                    <td width=1></td>"
  + "                    <td bgcolor=#0000FF width=8></td>"
  + "                    <td width=1></td>"
  + "                  </tr>"
  + "                </table>"
  + "              </div>"
  + "            </td>"
  + "          </tr>"
  + "        </table>"
  + "      </div>"
  + "    </td>"
  + "  </tr>"
  + "</table>"
  + "</center>"
  + "</div>"
   
  document.write(strLayer);;
}

/*******************************************************************************
 * name: _marquee
 * func: 私有方法. 驱动滚动条滚动.
 * in  : none
 * out : none
 * ret : none
 ******************************************************************************/
Loading.prototype._marquee = function()
{ 	
  oLoadingDiv = document.getElementById('loading');
  opieceDiv  = document.getElementById('piece');
  if(oLoadingDiv.scrollLeft <= 0)
  {
    oLoadingDiv.scrollLeft = opieceDiv.offsetWidth
  }
  else
  {
    oLoadingDiv.scrollLeft = oLoadingDiv.scrollLeft-2;
  }
};

/*******************************************************************************
 * name: Loading
 * func: 构造器.
 * in  : none
 * out : none
 * ret : none
 ******************************************************************************/
function Loading()
{
  var interval;
  var bShield;
};

/*******************************************************************************
 * name: Loading
 * func: 构造器.
 * in  : msg 显示的提示信息.
 *       left 提示框左上角坐标 
 *       top  提示框左上角坐标
 *       bAutoStart 是否自动显示
 *       bModal     是否为模态的
 * out : none
 * ret : none
 ******************************************************************************/
function Loading(msg, left, top, bAutoStart, bModal)
{
  this._writeIFrame();

  oDiv = document.getElementById('loadingdiv');
  
    oDiv.style.left = ((document.body.clientWidth /2))/2;
 
  	oDiv.style.top = (document.body.clientHeight/2)/2;
 
  if(!bAutoStart) 
  {
    if(bAutoStart == false)
    {
      bAutoStart = false;
    }
    else
    {
   	  bAutoStart = true;
   	}
  }
   
  if(!bModal) 
  {
   	bModal = false;
  } 

  oTxt = document.getElementById('msg');

  oTxt.innerHTML = msg;
  
  if(bModal) 
  {
    oIfr = document.getElementById('loadingIframe');
    oIfr.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=0)";

    this.bShield = true;
  }
  if(bAutoStart) 
  {
    this.start();
  }
};

/*******************************************************************************
 * name: start
 * func: 启动显示.
 * in  : none
 * out : none
 * ret : true : 成功。
 *       false: 已经显示。
 ******************************************************************************/
Loading.prototype.start = function()
{ 
  oIfr = document.getElementById('loadingIframe');
  oDiv = document.getElementById('loadingdiv');
  
  if(oDiv.style.display == 'block')
  {
    return false;
  }

  oIfr.style.display = 'block';
  oDiv.style.display = 'block';
  if(this.bShield) 
  {
  	var iWidth,iHeight;
    try {
      iWidth  = document.body.scrollWidth;
      iHeight = document.body.scrollHeight;
    }
    catch (e) {
    	iWidth  = window.screen.availWidth;
      iHeight = window.screen.availHeight;
    }

    oIfr.style.top = '0px';
    oIfr.style.left = '0px';
    oIfr.style.width = iWidth + 'px';
    oIfr.style.height = iHeight + 'px';
  }
  else 
  {
  	oIfr.style.top = oDiv.style.top;
    oIfr.style.left = oDiv.style.left;
    oIfr.style.width = oDiv.offsetWidth;
    oIfr.style.height = oDiv.offsetHeight;
  }
  

  oIfr.style.zIndex = oDiv.style.zIndex - 1;
  
  this.interval = setInterval(this._marquee, 30);
  return true;
};

/*******************************************************************************
 * name: stop
 * func: 停止显示.
 * in  : none
 * out : none
 * ret : none
 ******************************************************************************/
Loading.prototype.stop = function()
{ 
  clearInterval(this.interval);
  oDiv = document.getElementById('loadingdiv');
  oIfr = document.getElementById('loadingIframe');
  oIfr.style.top = '0px';
  oIfr.style.left = '0px';
  oIfr.style.width = 0;
  oIfr.style.height = 0;
  oIfr.style.zIndex = 0;
  
  oDiv.style.display = 'none';
  oIfr.style.display = 'none';
  //将滚动条设置到初始位置。
  oLoadingDiv = document.getElementById('loading');
  opieceDiv  = document.getElementById('piece');
  oLoadingDiv.scrollLeft = opieceDiv.offsetWidth
};
