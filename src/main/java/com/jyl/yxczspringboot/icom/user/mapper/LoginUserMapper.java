package com.jyl.yxczspringboot.icom.user.mapper;

import com.jyl.yxczspringboot.icom.base.mapper.BaseMapper;
import com.jyl.yxczspringboot.icom.user.entity.LoginUser;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginUserMapper extends BaseMapper{


    LoginUser login(LoginUser record);


}