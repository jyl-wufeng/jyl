
function trim(s) {
	return rtrim(ltrim(s));
}
function ltrim(s) {
	return s.replace(/^\s*/, "");
}
function rtrim(s) {
	return s.replace(/\s*$/, "");
}
function isHasInvalidChar(text) {
	var str = "`~!@#$%^&*()_+|\\=<>/[]{}'\"";
	var i = 0;
	for (var i = 0; i < str.length; i++) {
		if (text.value.indexOf(str.charAt(i)) != -1) {
			text.select();
			return true;
		}
	}
	return false;
}
function isNull(obj,message){
	if(obj && trim(obj.value) == ""){
		try{
			obj.focus();
		}
		catch(e){}
		tools.alert(message);
		return true;
	}
	return false;
}


/******************************************************************************
 * Copyright © Mocha Software Co.,Ltd. 
 ******************************************************************************/


/*******************************************************************************
 * 构造器
 ******************************************************************************/
function Verifier(){  

    this.tools = new Tools();


	//检测不能为空的域
	this.checkNullField = function (Field){
	   if(Field.value==""){
		 // this.tools.showAlert('check.inputisnone');
		  //Field.focus();
		  return false;
	   }else{
		   return true;
		}
	 }
	 //检测输入的值的长度
	 this.checkinputTextLength = function(Field,charLen){
	  var len = 0;
   		 for (var i = 0; i < Field.value.length; i++) {
        	if (Field.value.charCodeAt(i) > 255) len += 2; else len ++;
    		}
    	if(len>charLen){
    	//	this.tools.showAlert('check.inputtextlength');
    	//	Field.value="";
    		Field.focus();
    		return false;
    	}else{
    		return  true;
    	}
	}



	 //检测非法字符
	this.checkLawlessChar = function (Field){
	   var srcStr = /[#<>"*/\:@;&*^#@$%:\"\'~+"/\;]/ig;
	   var v=Field.value.match(srcStr);
	   if(v !=null){
		   Field.focus();
		   return false;
	   }
	   else{
		return true;
	   }
	 }
	 
	 //检查URL不能含有非法字符
	this.checkLawlessCharURL = function (Field){
	   var srcStr = /[#<>"*\@;&*^#@$%:\"\'~+"/\;]/ig;
	   var url = "http://";
	   if(Field.value.substring(0,7) == url){
		   var v = Field.value.substring(7,Field.value.length).match(srcStr);
		   if(v !=null){
			   Field.focus();
			   return false;
		   }
		   else{
			return true;
		   }
	   }else{
	   	 return false;
	   }
	 }

	 //只能在指定域内输入数字
	this.CheckInteger = function (Field){
		this.checkNullField(Field);
	   if (Field.value != ""){
		   for (i = 0; i < Field.value.length; i++){
			   ch = Field.value.charAt(i);
			   if ( (ch < '0' || ch > '9')/* && ch != '-' */) {
				    this.tools.showAlert("check.onlynumber");
					Field.focus();
					return	false;
				}
		   }
	   }
		return true;
	 }

	 //检查带小数点的数字是否合法
	this.CheckReal = function (Field){
		this.checkNullField(Field);
	   if (Field.value != ""){
	   	
	   	   for (i = 0; i < Field.value.length;  i++){
			   ch = Field.value.charAt(i);
			   if ((ch < '0' || ch > '9') && ch != '.'){
				    this.tools.showAlert("check.onlynumber");			   
				   Field.focus();
				   return false;
			   }
	   	   }
	   	   var arrayByNont = Field.value.split(".");
	   	   
	   	   if(arrayByNont.length == 1){// 没有“.”的情况
	   	   		if(arrayByNont[0].length > 10){
				    this.tools.showAlert("check.inputNamelength10");	   	   		
	   	   			Field.focus();
					return false;
	   	   		}
	   	   		if(arrayByNont[0].indexOf("0")==0 && arrayByNont[0].length > 1){// 不能以0开头
				    this.tools.showAlert("check.number.nozero");	   	   		
	   	   			Field.focus();
					return false;	   	   		
	   	   		}
	   	   }else if(arrayByNont.length == 2){//有一个“.”的情况
	   	   	
	   	   		if(arrayByNont[0].indexOf("0")==0 && Field.value.indexOf(".")!=1){// 以0开头,第二个字符必须是“.”
	   	   			this.tools.showAlert("check.number.error");
	   	   			Field.focus();
					return false;	   	   		
	   	   		}
	   	   			// "."不能在两边
	   	   		if((undefined==arrayByNont[0] ||""==arrayByNont[0]) || (undefined==arrayByNont[1] ||"" == arrayByNont[1])){
	   	   			this.tools.showAlert("check.number.error");
	   	   			Field.focus();
					return false;
	   	   		}else if(arrayByNont[0].length > 10 || arrayByNont[1].length >2){
	   	   			this.tools.showAlert("check.number.error");
	   	   			Field.focus();
					return false;	   	   		
	   	   		}
	   	   }else{
	   	   			this.tools.showAlert("check.number.error");
	   	   			Field.focus();
					return false;	   	   
	   	   }
	   	   
		  /* DotNum = 0;
		   	//第二位不是“.”时，第一位不能为“0”
		   if(Field.value.length > 13){
		   	Field.focus();
		   	return false;
		   }else if(Field.value.length > 10 && (Field.value).indexOf(".")){
		   
		   
		   }*/
		  /* if(Field.value.length>1 && Field.value.indexOf("0")==0 && Field.value.indexOf(".")!=1){
		  	 	Field.focus();
		   		return false;
		   }*/
	/*	   for (i = 0; i < Field.value.length;  i++){
			   ch = Field.value.charAt(i);
			   if ((ch < '0' || ch > '9') && ch != '.'){
				   //this.tools.showAlert("check.onlynumber");
				   Field.focus();
				   return false;
			   }
			   if (ch == '.'){
				   DotNum++;
			   		if((i==0 || i==Field.value.length -1) || DotNum > 1){
			   		   //this.tools.showAlert("check.onlyonedot");
			   		   Field.focus();
					   return false;
			   		}
					// 控制小数点后最多有两位
			   		if(Field.value.length - i > 3){
			   		   Field.focus();
					   return false;			   		
			   		}
			   		// 控制小数点前最多有十位
			   		if(i>10){
			   			Field.focus();
			   			return false;
			   		}
			   }
		   }*/
	   }
		   return	true;
	 }


	//此函数用于判断Email地址是否正确
	this.CheckEmail1 = function (Field){
	   // there must be >= 1 character before @, so we
	   // start looking at character position 1
	   // (i.e. second character)
	   var i = 1;
	   var len = Field.value.length;
	   if (len > 50){
         this.tools.showAlert("check.emailformaterr");
         return false;
	   }
	   pos1 = Field.value.indexOf("@");
	   pos2 = Field.value.indexOf(".");
	   pos3 = Field.value.lastIndexOf("@");
	   pos4 = Field.value.lastIndexOf(".");
	   //check '@' and '.' is not first or last character
	   if ((pos1 <= 0)||(pos1 == len-1)||(pos2 <= 0)||(pos2 == len-1)){
		   this.tools.showAlert("check.illegalemail");
		   Field.focus();
		   return false;
	   }
	   else{
		   //check @. or .@
		   if( (pos1 == pos2 - 1) || (pos1 == pos2 + 1)
			  || ( pos1 != pos3 )  //find two @
			  || ( pos4 < pos3 ) ) //. should behind the '@'
		   {
			   this.tools.showAlert("check.illegalemail");
			   Field.focus();
			   return false;
			}
	   }
	   return true;
	}

	// 检查 E-mail 是否合法
	this.CheckEmail = function (Field){
	//	var e = document.getElementById("mailaddress").value;
		this.checkNullField(Field);
		var e = Field.value;
		if(e != "") {
			if(!/(\S)+[@]{1}(\S)+[.]{1}(\w)+/.test(e)) {
				this.tools.showAlert("check.illegalemail");
	//			var email = document.getElementById ( "mailaddress" );
	//	        email.value = "";
	//		    email.focus ();
				Field.focus();
				return false;
			} 
		 }
	} 

	//检查IP地址是否合法
	this.isIPv4 = function (Field){
//		reg=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		this.checkNullField(Field);
		var reg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
		if(!reg.test(Field.value)){
			this.tools.showAlert("check.illegalip");
			return false;
		}
	}

	////检查IP地址是否合法
	this.checkIPAddress = function (Field){
		this.checkNullField(Field);
		this.CheckIntegerForIPAddress(Field);
		var   reSpaceCheck   =   /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;   
		if(reSpaceCheck.test(Field.value)){   
				Field.value.match(reSpaceCheck);   
				if   (RegExp.$1   <=   255   &&   RegExp.$1   >=   0     
						&&   RegExp.$2   <=   255   &&   RegExp.$2   >=   0     
						&&   RegExp.$3   <=   255   &&   RegExp.$3   >=   0     
						&&   RegExp.$4   <=   255   &&   RegExp.$4   >=   0)   {   
					return   true;   
				}else{
					this.tools.showAlert("check.illegalip");
				return   false;   
				}   
		}else{
			this.tools.showAlert("check.illegalip");
			return   false;   
		}   
	}
	this.CheckIntegerForIPAddress = function (Field){
		if (Field.value != ""){
			for (i = 0; i < Field.value.length; i++){
			   ch = Field.value.charAt(i);
			   if ( (ch < '0' || ch > '9') && ch != '.' ) {
				    this.tools.showAlert("check.illegalip");
					Field.value="";
					Field.focus();
					return	false;
				}
			}
		}
		return true;
	}

	//验证手机号码合法性
	this.checkMobile = function(Field){
		var reg=/13[0,1,2,3,5,6,7,8,9]\d{8}/;
		if (Field.value.match(reg)== null)	{
			this.tools.showAlert("check.illegalmobile");
			Field.focus(); 
			return false;
		}
		return true;
	} 


	//验证只能输入中文
	this.checkChinese = function(Field){
		var reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
		var v = Field.value;
		if(v.match(reg) == null){
			this.tools.showAlert("chech.onlychinesechar");
			return false;
		}
	}

	//验证只能输入英文与'.'
	
	this.checkEnglish = function (Field){
		if (Field.value != ""){
		   for (i = 0; i < Field.value.length; i++){
			   ch = Field.value.charAt(i);
			   if ( (ch < 'a' || ch > 'z')  && (ch < 'A' || ch > 'Z') && (ch != '.')) {
				    this.tools.showAlert("chech.onlyenglishchar");
					Field.focus();
					return	false;
				}
		   }
	   }
	}
	
	//检查上下文根路径是否合法
	this.checkContext = function (Field){
		if (Field.value != ""){
		
			if(Field.value.substring(0,1) != "/"){
				this.tools.showAlert("check.startwithbar");
			}else{
			   for (i = 0; i < Field.value.length; i++){
				   ch = Field.value.charAt(i);
				   if ( (ch < 'a' || ch > 'z')  && (ch < 'A' || ch > 'Z') && (ch != '/')) {
					    this.tools.showAlert("chech.onlyenglishchar");
						Field.focus();
						return	false;
					}
			   }
		   }
	   }
	}
	
	//验证只能输入英文、数字、与'.'
	this.checkNotChinese = function (Field){
		if (Field.value != ""){
			var url = "http://";
		    if(Field.value.substring(0,7) == url){
			   for (i = 7; i < Field.value.length; i++){
				   ch = Field.value.charAt(i);
				   if ( (ch < 'a' || ch > 'z')  && (ch < 'A' || ch > 'Z') && (ch != '.') && (ch < '0' || ch > '9')) {
					    this.tools.showAlert("chech.onlyenglishchar");
						Field.focus();
						return	false;
					}
			   }
			}
	   }
	}
	
	this.checkNotChinese2 = function (Field){
		if (Field.value != ""){
		
			for (i = 0; i < Field.value.length; i++){
				 ch = Field.value.charAt(i);
				 if ( (ch < 'a' || ch > 'z')  && (ch < 'A' || ch > 'Z') && (ch != '.') && (ch < '0' || ch > '9')) {
					this.tools.showAlert("chech.onlyenglishchar");
					Field.focus();
					return	false;
				 }
			}
		}
	}

	//验证不能输入空格

	this.checkBlankSpace = function (Field){
		var strlength;
		var k;
		var ch;
		strlength=Field.value.length;
		for(k=0;k<=strlength;k++){
			ch=Field.value.substring(k,k+1);
			if(ch==" "){
				this.tools.showAlert("check.nospace");  
				Field.focus();
				return false;
			}
		}
		return true;
	}


	this.checkPage = function (Field){
		var str = Field.value;
		str = str.substring(str.indexOf("."),str.length);
		if(str != ".jsp" && str != ".html" && str != ".htm"){
			this.tools.showAlert("check.permissivefiletype");
			return false;
		}
	}
	//验证电话号码合法性
/*
	this.checkPhone =function(){
		return /((^((\d){3,4}(\-)?)?(\d){7,8}$)|(^[1][3](\d){9,}$))|^[d]{1,}(\-)?(\d)$/.test(this);
	}

*/


	/***********************************************工具类***********************************************/

	//去掉左侧空格
	this.leftTrim = function (Field){
		return Field.value.replace(/(^\s*)/g, "");
	}


	//去除右侧的空格
	this.rightTrim = function (Field){
		return Field.value.replace(/(\s*$)/g, "");
	}


	//去除前后空格
	this.trim = function (Field){
		return Field.value.replace(/(^\s*)|(\s*$)/g, "");
	}


	//去掉所有的空格
	this.trimAll = function (Field){
		return Field.value.replace(/(\s*)/g, "");
	}


	//得到左边的字符串
	this.getLeft = function (Field,len){
		if(isNaN(len)|| len==null){
			len = Field.value.length;
		}else{
			if(parseInt(len)<0||parseInt(len)>Field.value.length){
				len = Field.value.length;
			}
		}
		return Field.value.substring(0,len);
	}


	//得到右边的字符串
	this.getRight = function (Field,len){
		if(isNaN(len)|| len==null){
			len = Field.value.length;
		}else{
			if(parseInt(len)<0||parseInt(len)>Field.value.length){
				len = Field.value.length;
			}
		}
		return Field.value.substring(Field.value.length-len,Field.value.length);
	}
	//获取系统当前时间
	this.getCurrentTime = function (){
		var  now  =  new  Date();
		var year = now.getYear();
		var month = now.getMonth();
		var date = now.getDate();
		var day = now.getDay();//星期0~6,日~六
		var  hours  =  now.getHours();
		var  minutes  =  now.getMinutes();
		var  seconds  =  now.getSeconds();
		var  timeValue  = year + "年"+month+"月"+date+"日"+switchWeekOfDay(day)+ hours;
		timeValue  +=  ((minutes  <  10)  ?  ":0"  :  ":")  +  minutes;
		timeValue  +=  ((seconds  <  10)  ?  ":0"  :  ":")  +  seconds;
		return timeValue; 
	}
	//自用方法,不要调用
	function switchWeekOfDay(day){
		
		switch(day){
			case 0: return "星期日";
			case 1: return "星期一";
			case 2: return "星期二";
			case 3: return "星期三";
			case 4: return "星期四";
			case 5: return "星期五";
			case 6: return "星期六";
		}
	}
	//两个时间差
	this.getDiffTime = function (date1,date2) {
		var diff=new Date()
		// sets difference date to difference of first date and second date
		diff.setTime(Math.abs(date1.getTime() - date2.getTime()));
		timediff = diff.getTime();
		hours = Math.floor(timediff / (1000 * 60 * 60)); 
		timediff -= hours * (1000 * 60 * 60);
		mins = Math.floor(timediff / (1000 * 60)); 
		timediff -= mins * (1000 * 60);
		secs = Math.floor(timediff / 1000); 
		timediff -= secs * 1000;

		return  hours+":"+ mins+":"+secs;
	}
}