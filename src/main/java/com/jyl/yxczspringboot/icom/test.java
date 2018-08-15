package com.jyl.yxczspringboot.icom;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class test {

    @RequestMapping("/hello")
    @ResponseBody
    public String getstr(){
        return "hekko";
    }

    @RequestMapping("/test")
    public String login(){
        return "/login";
    }
}
