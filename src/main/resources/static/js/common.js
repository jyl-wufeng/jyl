function fp_sendAjaxRequest(s_url, s_way, s_param, b_canEncode, s_contentType,
		v_callBack) {
	if (s_url == null || s_url == "")
		return;

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

function fp_checkHelper(o_field, s_flag, s_message, o_args, b_canFocus) {
	var o_check = new Verifier();
	try {
		if (o_field == null || o_field == "")
			return true;

		if (o_field.style.display == "none"
				|| o_field.style.visibility == "hidden"
				|| o_field.type == "hidden")
			return true;

		if (b_canFocus == null)
			b_canFocus = true;

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

	return true;
}

var BgObj = document.createElement("div");
function removeDIV(){
	document.body.removeChild(BgObj);
}
function addNotes(height){
	var bordercolor;
	titleheight = 25; 
	bordercolor = "#336699";
	titlecolor = "#99CCFF";

	var sWidth,sHeight;
	sWidth = document.body.offsetWidth;
	if(typeof height == 'undefined'){
		sHeight = screen.height;
	} else{
		sHeight = height;
	}

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
	document.body.appendChild(BgObj);
}