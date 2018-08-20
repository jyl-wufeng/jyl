package com.jyl.yxczspringboot.icom.user.controller;

import com.jyl.yxczspringboot.icom.base.entity.BaseResult;
import com.jyl.yxczspringboot.icom.user.entity.LoginUser;
import com.jyl.yxczspringboot.icom.user.service.LoginUserService;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {
    @Autowired
    LoginUserService loginUserService;

    @PostMapping("/login")
    @ResponseBody
    public BaseResult login(String loginName, String passWord, HttpServletRequest request) {
        BaseResult result = new BaseResult();
        LoginUser loginUser = new LoginUser();
        loginUser.setUserName(loginName);
        loginUser.setPassword(passWord);
        LoginUser login = loginUserService.login(loginUser);
        if (login != null) {
            request.getSession().setAttribute("userCode", login);
            result.setStatus(true);
            result.setMessage("登陆成功！");
        } else {
            result.setStatus(false);
            result.setMessage("请检查账号或密码是否正确！");
        }
        return result;
    }
}
