$(function(){
    $.ajax({
        type: "POST",
        url: "/indexView",
        data: "start=1&pageSize=5",
        success: function(page){
          let str=loadFaxList(page.list,"Y");
          $("#app").append(str);
        },
        error:function(){
            layer.error("服务器无法连接！")
        }
    });

})

let loadFaxList =(faxList,role) =>{
    let str="";
    for(index in faxList){
       let fax=faxList[index];
        str=str+`
         <div class="fax_licon" id="${fax.id}">
            <div class="list_title">
				<p class="list_title_p fl">
                   ${fax.isTop="Y"?'<span class="list_tt_zd" style="float: left;">HOT</span>&nbsp;':''}
                   ${showStatus(fax.statu)}
                   ${fax.title}
                </p>
            <div class="list_bnt list_tc fr">
                <div class="my_rela1" style="display: ${role='gly'?'block':'none'}">			
					<span style="font-size: 16px;" onclick="editNew('${fax.id}')" class="huifu_n_span my_ico5">编辑</span>
				</div>
                <div class="my_rela1">
                    <span onclick="shoucang(this,'${fax.id}')" class="huifu_n_span ${fax.isCollection='Y'?"my_ico3":"my_ico2"}<a href="###">${fax.isCollection='Y'?"已收藏":"收藏"}</a></span>
                </div>
                <div class="my_rela1" style="display: ${role='gly'?'block':'none'}">
                      <span onclick="my_sumbit(this)" class="huifu_n_span my_ico1" style="    font-size: 16px;">置顶</span>
                      <div class="my_tips" id="manyiXW-ED8EA707-68AD-11E8-88E8-DDF6BB13B621">
                        序号：<input type="text" name="xuhao" id="xuhao" value="${fax.extend2}" style="width:93px;height:20px" ></input>
                      <a href="javascript:;" onclick="my_sumbitClose(this)" class="my_close">关闭</a>
                      <a href="javascript:;" onclick="my_sumbitZhiding(this,'${fax.id}')" class="my_sumbit" style="white-space:nowrap; display:inline;">确定</a>
                      <a href="javascript:;" onclick="cancelTop(this,'${fax.id}')" class="my_sumbit" style="white-space:nowrap; display:inline;">取消置顶</a>
                      </div>
                </div>
            </div>
            <div class="my_rela1">
                 <span ${role='gly'?'onclick="changMc_New(\'1\',this)"':''}
					class="huifu_n_span my_ico6" style="font-size: 16px;">答复()
				 </span>
            </div>
            <div class="my_rela1">
                 <span  onclick="changMc_New('2',this)"class="huifu_n_span my_ico7" style="font-size: 16px;">评论()</span>
            </div>
            </div>
			<div class="clear"></div>
	
			<div class="fax_main">
                <div class="fax_main_l fl">
					<div class="list_r_title">
					    ${fax.personDept}<span>${fax.personName}</span><span>${fax.personTel}</span>
					    	<div class="Fabulous icon_click zhichi ${fax.isZhichi='Y'?'bacc_10':''}  onclick="javascript:clickAgree('yes','${fax.id}',this)">
								<p id="agreeCount" class="numval Fabulous_p">${fax.supportNum}</p>
							</div>
							<div class="Fabulous icon_click fandui ${fax.isFandui='Y'?'bacc_11':''} onclick="javascript:clickAgree('no','${fax.id}',this)">
								<p id="noagreeCount" class="numval Fabulous_p">${fax.negativeNum}</p>
							</div>
					</div>
					<div class="fax_main_l_p allDesc">
					   ${fax.content}
					</div>
					<div class="download" style="width:340px">
						<a alt="测试" title="测试"  href="测试"><div class="download1 fl"></div></a>
						<div class="clear"></div>
					</div>
					<div class="fax_main_l_time">${fax.pubTime}</div>
					<br>
					<div id="qianshoubumen" class="fax_main_l_time">
					    ${fax.extend5}
					</div>
					<br>
				</div>
				
                <div class="fax_main_r fr">
                      <div class="clear"></div>
                     ${showDf(fax.dfList)}
                      <div class="clear"></div>
                </div>
                <div class="clear"></div>
			</div>
		 </div>
        `
    }
    return str;
}
let showStatus=(status)=>{
    switch (status){
        case 2:
            return `<span class="title_sp fl">[已签收]</span><span class="title_sp  fl">[已答复]</span>`;
        case 9:
            return `<span class="title_sp fl">[已签收]</span><span class="title_sp fcc_red  fl">[未答复]</span>`;
        case 1:
            return ` <span class="title_sp fcc_red fl">[未签收]</span><span class="title_sp fcc_red  fl">[未答复]</span>`;
        default:
            return ``;
    }
}

let showDf=(list)=>{
    let str=""
    for(index in list){
      let  df=list[index];
        str=str+`
        <div class="huida">
			<div class="state_1 fl">答</div>
				<div class="state_1_con fr">
                    <div class="huida_li ">
						<div class="state_1_con_title"><div class="state_name fl">${df.reviewDept}</div><span class="state_1_con_title_time">${df.reviewUsername}</span>
							<div class="my_rela" >			
							  <span onclick="edit(this,'1','${df.id}')" class="huifu_n_span my_ico5">编辑答复</span>	
							  <div class="clear"></div>
						    </div>	
						</div>
							<div class="state_1_con_p">			
                                ${df.faxConnent}
                            </div>
                    </div>
                </div>
				  <div class="clear"></div>
		</div>                                           
        `
    }
    return str;
}