package com.jyl.yxczspringboot.icom.fax.controller;

import com.github.pagehelper.PageInfo;
import com.jyl.yxczspringboot.icom.base.util.JsonUtil;
import com.jyl.yxczspringboot.icom.fax.entity.FaxEntity;
import com.jyl.yxczspringboot.icom.fax.service.FaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
public class faxController {
    @Autowired
    FaxService faxService;

    /*
    获取问题列表
     */
    @PostMapping("/indexView")
    @ResponseBody
    public Object indexView(String queryJson, int start, int pageSize, HttpServletRequest request) {
        Map maps = JsonUtil.jsonToMap(queryJson);
        PageInfo<FaxEntity> faxEntityPageInfo = faxService.queryIndexView(maps, start, pageSize);
        return faxEntityPageInfo;
    }

    @GetMapping("/indexView")
    public String indexView(){
        return "/fax/homeFaxList";
    }
}
