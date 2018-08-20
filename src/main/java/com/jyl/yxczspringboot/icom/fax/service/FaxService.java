package com.jyl.yxczspringboot.icom.fax.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jyl.yxczspringboot.icom.base.service.BaseService;
import com.jyl.yxczspringboot.icom.fax.entity.FaxEntity;

import java.util.Map;

public interface FaxService extends BaseService<FaxEntity>{

   // 首页显示
    PageInfo<FaxEntity> queryIndexView(Map map,int pageNo,int pageSize);
}
