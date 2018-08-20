package com.jyl.yxczspringboot.icom.fax.mapper;

import com.jyl.yxczspringboot.icom.base.mapper.BaseMapper;
import com.jyl.yxczspringboot.icom.fax.entity.FaxReview;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
@Mapper
public interface FaxReviewMapper extends BaseMapper {
   public List<FaxReview> selectByMap(Map map);
}