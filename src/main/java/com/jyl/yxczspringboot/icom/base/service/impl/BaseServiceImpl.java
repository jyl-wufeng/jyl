package com.jyl.yxczspringboot.icom.base.service.impl;


import com.jyl.yxczspringboot.icom.base.mapper.BaseMapper;
import com.jyl.yxczspringboot.icom.base.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseServiceImpl<T> implements BaseService<T> {
    BaseMapper<T> mapper;
   public  int deleteByPrimaryKey(String id){
        return mapper.deleteByPrimaryKey(id);
    }

    public int insert(T record){
        return mapper.insert(record);
    }

    public int insertSelective(T record){
        return mapper.insertSelective(record);
    }

    public T selectByPrimaryKey(String id){
        return mapper.selectByPrimaryKey(id);
    }

    public int updateByPrimaryKeySelective(T record){
        return mapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(T record){
        return mapper.updateByPrimaryKey(record);
    }

    public void setMapper(BaseMapper<T> mapper) {
        this.mapper = mapper;
    }
}
