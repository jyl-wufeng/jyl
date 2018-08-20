/*******************************************************************************
 * Title : bpm_common.js
 * Description : BPM项目通用JS——福建移动BPM一期项目组 添加 Copyright (C)
 * Mocha Software Co.,Ltd.
 *
 * @author linda linda@mochasoft.com.cn
 * @version Mocha BPM v6.0
 ******************************************************************************/

//去掉空格
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

/*******************************************************************************
 * 发送Ajax请求
 *
 * s_url:请求的URL s_way:发送方式：post、get，默认为post s_param：发送请求时附加的参数字符串
 * b_canEncode：是否需要加密（传送中文需要加密），默认为false
 * s_contentType：传送内容类型，默认为：application/x-www-form-urlencoded;
 * charset=UTF-8，若为文件：multipart/mixed stream; charset=UTF-8
 * v_callBack：请求返回时调用的处理函数的函数句柄
 ******************************************************************************/
function fp_sendAjaxRequest(s_url, s_way, s_param, b_canEncode, s_contentType,
		v_callBack) {
	if (s_url == null || s_url == "")
		return;

	// Ajax用POST方法传送中文，尽管设置了RequestHeader，也会乱码，
	// 所以需要encodeURI两次加密，并在接收方使用java.net.URLDecoder.decode解码
	if (s_param != null && b_canEncode == true)
		s_param = encodeURI(encodeURI(s_param));
	var o_xmlHttp;
	if (window.ActiveXObject) {
		o_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		o_xmlHttp = new XMLHttpRequest();
	}

	o_xmlHttp.onreadystatechange = function() {
		if (o_xmlHttp.readyState == 4) {
			if (o_xmlHttp.status == 200) {
				// 具体的数据处理函数，自行实现
				if (typeof v_callBack == "function")
					v_callBack(o_xmlHttp);
			}
		}
	};
	if (s_way == null)
		s_way = "POST";

	if (s_contentType == null)
		s_contentType = "application/x-www-form-urlencoded; charset=UTF-8";

	o_xmlHttp.open(s_way, s_url, true);
	o_xmlHttp.setRequestHeader("Content-Type", s_contentType);
	o_xmlHttp.send(s_param);
}

/*******************************************************************************
 * 清空下拉框选项
 *
 * o_select:要清空的元素
 * b_isInit:是否初始化下拉框（填充“请选择”）
 * s_initValue:初始化值
 * s_initText:初始化文本
 ******************************************************************************/
function fp_clearOption(o_select, b_isInit, s_initValue, s_initText) {
	if (o_select == null || o_select.options == null)
		return false;
	while (o_select.options.length > 0) {
		o_select.options.removeChild(o_select.options[0]);
	}

	if (b_isInit == null || b_isInit) {

		if(s_initValue == null){
			s_initValue = "";
		}

		if(s_initText == null){
			s_initText = "请选择";
		}

		if (!fp_addOption(o_select, s_initValue, s_initText)) {
			return false;
		}
	}
	return true;
}

/*******************************************************************************
 * 添加下拉框选项（单个）
 *
 * o_select:要添加选项的元素
 * s_val:选项的值
 * s_txt:选项的（显示）文本
 * s_defaultValue:默认值
 ******************************************************************************/
function fp_addOption(o_select, s_value, s_text, s_defaultValue) {
	if (o_select == null || o_select.options == null)
		return false;

	var o_option = document.createElement("OPTION");
	o_select.options.add(o_option);
	o_option.innerText = s_text;
	o_option.value = s_value;

	if(s_value == s_defaultValue){
		o_option.selected = true;
	}
	return true;
}

/*******************************************************************************
 * 添加下拉框选项（多个）
 *
 * o_select:要添加选项的元素
 * s_txts:选项的（显示）文本（数组）
 * s_vals:选项的值（数组）
 ******************************************************************************/
function fp_addOptions(o_select, o_texts, o_values) {
	if (!fp_clearOption(o_select))
		return false;
	for (var i = 0; i < o_texts.length && i < o_values.length; i++) {
		var o_option = document.createElement("OPTION");
		o_select.options.add(o_option);
		o_option.innerText = o_texts[i];
		o_option.value = o_values[i];
	}
	return true;
}


/*******************************************************************************
 * 初始化“是否”下拉框
 *
 * o_select:要初始化的元素
 ******************************************************************************/
function fp_initIsNot(o_select) {
	if (o_select == null)
		return false;
	fp_clearOption(o_select);
	fp_addOption(o_select, "1", "是");
	fp_addOption(o_select, "0", "否");
	return true;
}


/*******************************************************************************
 * 设置隐藏字段的域值及前台的文本显示
 *
 * o_formField: 需要隐藏的表单域
 * s_textValue: 需要填充的域值
 ******************************************************************************/
function fp_setHiddenField(o_formField, s_textValue) {
	if (o_formField == null)
		return;

	if (s_textValue == null)
		s_textValue = o_formField.value;

	o_formField.value = s_textValue;
	o_formField.style.display = "none";

	o_formField.replaceAdjacentText("AfterEnd", s_textValue);
}

/*******************************************************************************
 * 设置隐藏字段的域值及前台的文本显示
 *
 * o_formField: 需要隐藏的表单域
 * s_textValue: 需要填充的域值
 ******************************************************************************/
function fp_releaseHiddenField(o_formField, s_textValue) {
	if (o_formField == null)
		return;

	if (s_textValue == null)
		s_textValue = o_formField.value;

	o_formField.value = s_textValue;
	o_formField.style.display = "";

	o_formField.replaceAdjacentText("AfterEnd", "");
}

/*******************************************************************************
 * 辅助验证函数
 *
 * o_field:需验证的表单元素 s_flag:验证标识
 * s_message：显示的提示语（来源于/bpm_sample/src/main/java/com/mdcl/mocha/bpm/sample/resources/prompt.properties）
 * o_args：提示语的附加参数列表 b_callFocus：是否触发focus事件
 ******************************************************************************/
function fp_checkHelper(o_field, s_flag, s_message, o_args, b_canFocus) {
	// 指的是/bpm_sample/src/main/bpm_sample/js/check.js里的Verifier对象。
	var o_check = new Verifier();
	try {
		if (o_field == null || o_field == "")
			return true;

		// 元素为不可见，或者只读，无法设置焦点，也不必提示
		if (o_field.style.display == "none"
				|| o_field.style.visibility == "hidden"
				|| o_field.type == "hidden")
			return true;

		if (b_canFocus == null)
			b_canFocus = true;

		// 为空验证
		if (s_flag == "isnone") {
			if (!o_check.checkNullField(o_field)) {

				if (s_message == null) {
					s_message = "fjcmcc.Check.TextIsNone";
					if (o_field.type == "radio" || o_field.type == "checkbox"
							|| o_field.type == "select-one")
						s_message = "fjcmcc.Check.SelectIsNone";
				}

				o_check.tools.showAlert(s_message, null, o_args);
				if (b_canFocus)
					o_field.focus();
				return false;
			}
		}

		// 数字验证
		if (s_flag == "number") {
			if (!fp_checkHelper(o_field, "isnone", s_message, o_args,
					b_canFocus)) {
				return false;
			}
			if (!o_check.CheckInteger(o_field)) {
				if (s_message == null)
					s_message = "fjcmcc.Check.OnlyNumber";
				o_check.tools.showAlert(s_message, null, o_args);
				o_field.value = "";
				if (b_canFocus)
					o_field.focus();
				return false;
			}
		}

		// 带小数点的数字验证
		if (s_flag == "realnumber") {
			if (!fp_checkHelper(o_field, "isnone", s_message, o_args,
					b_canFocus)) {
				return false;
			}
			if (!o_check.CheckReal(o_field)) {
				if (s_message == null)
					s_message = "fjcmcc.Check.OnlyNumber";
				o_check.tools.showAlert(s_message, null, o_args);
				o_field.value = "";
				if (b_canFocus)
					o_field.focus();
				return false;
			}
		}
	} catch (e) {
		o_check.tools.showAlert("fjcmcc.Check.FailFocus");
		return false;
	}

	// 依次添加所需要调用的验证函数，并自行添加flag标示符内容
	return true;
}

/*******************************************************************************
 * 检验数字类型长度
 *
 * o_field:需验证的表单元素
 * n_integerLength:整数部分长度
 * n_decimalLength:小数部分长度
 * s_message：显示的提示语（来源于/bpm_sample/src/main/java/com/mdcl/mocha/bpm/sample/resources/prompt.properties）
 * o_args：提示语的附加参数列表
 * b_callFocus：是否触发focus事件
 ******************************************************************************/
function fp_checkNumberLength(o_field, n_integerLength, n_decimalLength,
		s_message, o_args, b_canFocus) {

	if (o_field == null)
		return true;

	if (!fp_checkHelper(o_field, "realnumber", s_message, o_args, b_canFocus))
		return false;

	// 指的是/bpm_sample/src/main/bpm_sample/js/check.js里的Verifier对象。
	var o_check = new Verifier();

	// 小数点索引
	var n_curDotIndex = o_field.value.indexOf(".");
	if (n_curDotIndex < 0)
		n_curDotIndex = o_field.value.length;
	// 整数部分长度
	var n_curIntegerLength = o_field.value.substr(0, n_curDotIndex).length;
	// 小数部分长度
	var n_curDecimalLength = o_field.value.substr(n_curDotIndex + 1).length;

	// 检验整数部分长度
	if (n_integerLength == null || isNaN(n_integerLength)
			|| n_integerLength < 1)
		return true;
	if (n_curIntegerLength > n_integerLength) {
		if (s_message == null)
			s_message = "fjcmcc.Check.OverIntegerLength";
		o_check.tools.showAlert(s_message, null, o_args);
		o_field.value = "";
		o_field.focus();
		return false;
	}

	// 检验小数部分长度
	if (n_decimalLength == null || isNaN(n_decimalLength)
			|| n_decimalLength < 1)
		return true;
	if (n_curDecimalLength > n_decimalLength) {
		if (s_message == null)
			s_message = "fjcmcc.Check.OverDecimalLength";
		o_check.tools.showAlert(s_message, null, o_args);
		o_field.value = "";
		o_field.focus();
		return false;
	}
	return true;
}

/*******************************************************************************
 * 检验字符串长度
 *
 * o_field:需验证的表单元素
 * n_length:限制长度
 * s_message：显示的提示语（来源于/bpm_sample/src/main/java/com/mdcl/mocha/bpm/sample/resources/prompt.properties）
 * o_args：提示语的附加参数列表
 * b_callFocus：是否触发focus事件
 ******************************************************************************/
function fp_checkStringLength(o_field, n_length, s_message, o_args, b_callFocus) {

	if (o_field == null)
		return true;

	if (!fp_checkHelper(o_field, "isnone", s_message, o_args, b_canFocus))
		return false;

	// 指的是/bpm_sample/src/main/bpm_sample/js/check.js里的Verifier对象。
	var o_check = new Verifier();

	if (n_length == null || isNaN(n_length))
		return true;
	if (o_field.value.length > n_integerLength) {
		if (s_message == null)
			s_message = "fjcmcc.Check.OverLength";
		o_check.tools.showAlert(s_message, null, o_args);
		o_field.value = "";
		o_field.focus();
		return false;
	}
}

/*******************************************************************************
 * 检验字符串长度
 *
 * o_field:需验证的表单元素
 * n_length:限制长度
 * s_message：显示的提示语（来源于/bpm_sample/src/main/java/com/mdcl/mocha/bpm/sample/resources/prompt.properties）
 * o_args：提示语的附加参数列表
 * b_callFocus：是否触发focus事件
 ******************************************************************************/
function fp_checkDate(o_startDate, o_endDate, s_message, o_args, b_callFocus) {

	if (o_startDate == null || o_endDate == null)
		return true;

	if (!fp_checkHelper(o_startDate, "isnone", s_message, o_args, b_canFocus))
		return false;

	if (!fp_checkHelper(o_endDate, "isnone", s_message, o_args, b_canFocus))
		return false;

	// 指的是/bpm_sample/src/main/bpm_sample/js/check.js里的Verifier对象。
	var o_check = new Verifier();

	if (o_startDate.value > o_endDate.value) {
		if (s_message == null)
			s_message = "fjcmcc.Check.StartDateIsLater";
		o_check.tool.showAlert(s_message, null, o_args);
		return false;
	}
}


/*******************************************************************************
 * 为指定事件追回调用方法
 *
 * o_object:需追加响应方法的控件对象
 * s_event:需要追加的方法响应的事件
 * f_handler:需要追加的方法句柄
 ******************************************************************************/
function fp_addEvent(o_object, s_event, f_handler) {
	if (typeof(f_handler) != "function")
		return false;

	try {
		o_object.attachEvent(s_event, f_handler);
	} catch (e) {
		var o_tool = new Tools();
		o_tool.showAlert("lncmcc.Check.AddEventError");
	}
	return true;
}

/*******************************************************************************
 * 限制字节数
 *
 * obj 限制字节数的文本框对象
 * byteLength 限制字节数的长度 s_msg
 * 显示的提示语（来源于/bpm_sample/src/main/java/com/mdcl/mocha/bpm/sample/resources/prompt.properties）
 * o_args：提示语的附加参数列表
 * canCheck：是否进行为空验证，默认为不进行检测
 * b_callFocus：是否触发focus事件
 ******************************************************************************/
function fp_limitLength(obj, byteLength, s_msg, o_args, canCheck, b_canFocus) {
	if (obj == null || obj == "") {
		return true;
	}

	if (canCheck == null) {
		canCheck = false;
	}

	if (canCheck && !fp_checkHelper(obj, "isnone", s_msg, o_args, b_canFocus))
		return false;

	var o_tool = new Tools();
	var value = obj.value;
	var newvalue = value.replace(/[^\x00-\xff]/g, "**");
	var length = newvalue.length;
	// 当填写的字节数小于设置的字节数
	if (length * 1 <= byteLength * 1) {
		return true;
	}

	var limitDate = newvalue.substr(0, byteLength);
	var count = 0;
	var limitvalue = "";
	for (var i = 0; i < limitDate.length; i++) {
		var flat = limitDate.substr(i, 1);
		if (flat == "*") {
			count++;
		}
	}

	var size = 0;
	var istar = newvalue.substr(byteLength * 1 - 1, 1);// 校验点是否为“×”
	// if 基点是×; 判断在基点内有×为偶数还是奇数
	// 当为偶数时
	if (count % 2 == 0) {
		size = count / 2 + (byteLength * 1 - count);
		limitvalue = value.substr(0, size);
	}
	// 当为奇数时
	else {
		size = (count - 1) / 2 + (byteLength * 1 - count);
		limitvalue = value.substr(0, size);
	}

	if (s_msg == null) {
		s_msg = "fjcmcc.Check.OverLength";
	}

	if (o_args != null && o_args instanceof Array && o_args.length < 2) {
		o_args[1] = byteLength;
	}
	o_tool.showAlert(s_msg, null, o_args);
	obj.focus();
	obj.value = limitvalue;
	return false;
}




/*******************************************************************************
 * Ajax下载文件
 *
 * s_url:请求的URL
 * s_way:发送方式：post、get，默认为post
 * s_param：发送请求时附加的参数字符串
 * b_canEncode：是否需要加密（传送中文需要加密），默认为false
 * s_filePath：文件保存路径
 * f_callBack：请求返回时调用的处理函数的函数句柄
 ******************************************************************************/
function fp_donwloadFile(s_url, s_param, b_canEncode, s_filePath, f_callBack) {
	var o_ADODBStream = null;
	try {
		// 获取文件内容字节流
		fp_sendAjaxRequest(s_url, "POST", s_param, b_canEncode, null, function(
						o_xmlHttp) {
					o_ADODBStream = new ActiveXObject("ADODB.Stream");
					// 以二进制方式操作
					o_ADODBStream.Type = 1;
					o_ADODBStream.Open();
					o_ADODBStream.write(o_xmlHttp.responseBody);
					// 1:不存在则创建；2：总是覆盖
					o_ADODBStream.SaveToFile(s_filePath, 2);
					o_ADODBStream.Close();
					o_ADODBStream = null;
					o_xmlHttp = null;

					if (typeof(f_callBack) == "function")
						f_callBack();
				});
	} catch (e) {
		var o_tools = new Tools();
		o_tools.showAlert("fjcmcc.Check.DownloadError");
	} finally {
		if (o_ADODBStream != null) {
			o_ADODBStream.Close();
		}
		o_ADODBStream = null;
	}
}

/*******************************************************************************
 * Ajax上传文件
 *
 * s_url:请求的URL
 * s_way:发送方式：post、get，默认为post
 * b_canEncode：是否需要加密（传送中文需要加密），默认为false
 * s_filePath：文件路径
 * f_callBack：请求返回时调用的处理函数的函数句柄
 ******************************************************************************/
function fp_uploadFile(s_url, b_canEncode, s_filePath, f_callBack) {
	var o_ADODBStream = null;
	try {

		o_ADODBStream = new ActiveXObject("ADODB.Stream");
		// 以二进制形式读取
		o_ADODBStream.Type = 1;
		o_ADODBStream.Open();
		o_ADODBStream.LoadFromFile(s_filePath);

		var s_param = o_ADODBStream.Read(o_ADODBStream.Size);

		fp_sendAjaxRequest(s_url, "POST", s_param, b_canEncode,
				"multipart/form-data; charset=UTF-8", function(o_xmlHttp) {
					if (typeof(f_callBack) == "function")
						f_callBack();

					if (o_ADODBStream != null)
						o_ADODBStream.Close();
					o_ADODBStream = null;
				});
	} catch (e) {
		var o_tools = new Tools();
		o_tools.showAlert("fjcmcc.Check.UploadError");

		if (o_ADODBStream != null)
			o_ADODBStream.Close();
		o_ADODBStream = null;
	}
}

/*******************************************************************************
 * 加载XML
 *
 * s_xml: XML文件全路径，或者XML字符流
 * b_loadWay：加载方式，true(默认值)——以文件形式加载，false——以xml流形式加载
 ******************************************************************************/
function fp_loadXML(s_xml, b_loadWay) {
	var o_xmlDoc = null;

	if (b_loadWay == null) {
		b_loadWay = true;
	}

	// code for IE
	if (window.ActiveXObject) {
		o_xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		o_xmlDoc.async = false;
		if (b_loadWay) {
			o_xmlDoc.load(s_xml);
		} else {
			o_xmlDoc.loadXML(s_xml);
		}
	}
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
		o_xmlDoc = document.implementation.createDocument("", "", null);
		if (b_loadWay) {
			o_xmlDoc.load(s_xml);
		} else {
			o_xmlDoc.loadXML(s_xml);
		}
	} else {
		var o_tools = new Tools();
		o_tools.showAlert("fjcmcc.Check.NotSupport4XML");
	}
	return o_xmlDoc;
}

//获得工程名称
function get_contextPath(){
	return document.location.protocol + "//" + document.location.host+ "/NewsOnline";
}
var BgObj = document.createElement("div");
function removeDIV(){
	document.body.removeChild(BgObj);
}
function addNotes(height){

	var bordercolor;
	titleheight = 25; //提示窗口标题高度
	bordercolor = "#336699";//提示窗口的边框颜色
	titlecolor = "#99CCFF";//提示窗口的标题颜色

	var sWidth,sHeight;
	sWidth = document.body.offsetWidth;//浏览器工作区域内页面宽度
	if(typeof height == 'undefined'){
		sHeight = screen.height;//屏幕高度（垂直分辨率）
	} else{
		sHeight = height;
	}
	//  HideElements('0');
	//背景层（大小与窗口有效区域相同，即当弹出对话框时，背景显示为放射状透明灰色）

	//定义div属性，即相当于
	//<div id="bgDiv" style="position:absolute; top:0; background-color:#777; filter:progid:DXImagesTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75); opacity:0.6; left:0; width:918px; height:768px; z-index:10000;"></div>
	BgObj.setAttribute('id','bgDiv');
	BgObj.style.position = "absolute";
	BgObj.style.top = "0";
	BgObj.style.background = "#777";
	BgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
	BgObj.style.opacity = "0.6";
	BgObj.style.left = "0";
	BgObj.style.width = sWidth + "px";
	BgObj.style.height = sHeight + "px";
	BgObj.style.zIndex = "10000";
	document.body.appendChild(BgObj);//在body内添加该div对象
}
/*******************************************************************************
 * 新增收藏夹内容
 *
 * newsId: XML文件全路径，或者XML字符流
 * b_loadWay：加载方式，true(默认值)——以文件形式加载，false——以xml流形式加载
 ******************************************************************************/
function setFavorite(newsId){
	var url = get_contextPath() + "/jsp/newsinfo/newsFavoriteFolderAction.do?method=checkNewsFavoriteFolder";
	var n_param = "newsId2=3&newsId=" + newsId;
	fp_sendAjaxRequest(url, 'POST', n_param, '', null, addFavorite);
	addNotes();
}

// 校验新闻是否已经是收藏夹内容
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

//提示信息
function showFavoriteInfo(info){
	if(info.responseText == 'yes'){
		alert("收藏成功!");
	} else{
		alert("收藏失败,请稍后再试!")
	}
	removeDIV();
}
// 各个版本ie无提示关闭页面
function closeWin(){
	window.opener = null;
	window.open('','_self');
	window.close();
}