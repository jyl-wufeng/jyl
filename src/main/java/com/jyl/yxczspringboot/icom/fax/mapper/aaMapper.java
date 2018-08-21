package com.jyl.yxczspringboot.icom.fax.mapper;

import com.jyl.yxczspringboot.icom.fax.entity.aa;

public interface aaMapper {
    int deleteByPrimaryKey(String id);

    int insert(aa record);

    int insertSelective(aa record);

    aa selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(aa record);

    int updateByPrimaryKey(aa record);
}