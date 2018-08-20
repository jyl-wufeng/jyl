package com.jyl.yxczspringboot.icom.user.service.impl;

import com.jyl.yxczspringboot.icom.base.service.impl.BaseServiceImpl;
import com.jyl.yxczspringboot.icom.user.mapper.LoginUserMapper;
import com.jyl.yxczspringboot.icom.user.service.LoginUserService;
import org.springframework.beans.factory.annotation.Autowired;
import com.jyl.yxczspringboot.icom.user.entity.LoginUser;
import org.springframework.stereotype.Service;

@Service
public class LoginUserServiceImpl extends BaseServiceImpl<LoginUser> implements LoginUserService  {
    LoginUserMapper loginUserMapper;


    @Autowired
    public void setLoginUserMapper(LoginUserMapper loginUserMapper) {
        super.setMapper(loginUserMapper);
        this.loginUserMapper = loginUserMapper;
    }

    @Override
    public LoginUser login(LoginUser loginUser) {
        return loginUserMapper.login(loginUser);
    }
}
