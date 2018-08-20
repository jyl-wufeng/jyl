package com.jyl.yxczspringboot.icom.user.service;

import com.jyl.yxczspringboot.icom.base.service.BaseService;
import com.jyl.yxczspringboot.icom.user.entity.LoginUser;

public interface LoginUserService extends BaseService<LoginUser> {
    LoginUser login(LoginUser loginUser);
}
