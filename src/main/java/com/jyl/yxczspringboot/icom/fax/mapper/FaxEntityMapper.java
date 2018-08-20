package com.jyl.yxczspringboot.icom.fax.mapper;

import com.jyl.yxczspringboot.icom.base.mapper.BaseMapper;
import com.jyl.yxczspringboot.icom.fax.entity.FaxEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FaxEntityMapper extends BaseMapper {

 public List<FaxEntity> selectByMap(Map map);
}