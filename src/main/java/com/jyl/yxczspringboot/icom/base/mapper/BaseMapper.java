package com.jyl.yxczspringboot.icom.base.mapper;


import com.jyl.yxczspringboot.icom.fax.entity.FaxReview;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BaseMapper<T> {


    int deleteByPrimaryKey(String id);

    int insert(T record);

    int insertSelective(T record);


    T selectByPrimaryKey(String id);



    int updateByPrimaryKeySelective(T record);

    int updateByPrimaryKey(T record);
}
