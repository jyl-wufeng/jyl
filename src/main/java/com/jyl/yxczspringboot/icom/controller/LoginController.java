package com.jyl.yxczspringboot.icom.controller;

import com.jyl.yxczspringboot.icom.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Controller
public class LoginController {
    @RequestMapping(value = "/login", method= RequestMethod.POST)
    @ResponseBody
    public String login(User user,HttpServletRequest request){

        System.out.println(user.getLoginName());
        System.out.println(user.getLoginPass());
        request.getSession().setAttribute("userCode", UUID.randomUUID().toString());
        return "登陆成功！";
    }
}
