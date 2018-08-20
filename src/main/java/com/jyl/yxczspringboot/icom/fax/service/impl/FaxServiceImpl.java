package com.jyl.yxczspringboot.icom.fax.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jyl.yxczspringboot.icom.base.service.impl.BaseServiceImpl;
import com.jyl.yxczspringboot.icom.fax.entity.FaxEntity;
import com.jyl.yxczspringboot.icom.fax.entity.FaxReview;
import com.jyl.yxczspringboot.icom.fax.mapper.FaxEntityMapper;
import com.jyl.yxczspringboot.icom.fax.mapper.FaxReviewMapper;
import com.jyl.yxczspringboot.icom.fax.service.FaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class FaxServiceImpl extends BaseServiceImpl<FaxEntity> implements FaxService {
    FaxEntityMapper faxEntityMapper;
    @Autowired
    FaxReviewMapper faxReviewMapper;
    @Autowired
    public void setFaxEntityMapper(FaxEntityMapper faxEntityMapper) {
        super.setMapper(faxEntityMapper);
        this.faxEntityMapper = faxEntityMapper;
    }


    @Override
    public PageInfo<FaxEntity> queryIndexView(Map map, int pageNo, int pageSize) {
        PageHelper.startPage(pageNo,pageSize);
        List<FaxEntity> faxEntities = faxEntityMapper.selectByMap(map);
        //获取评论和答复
        Map pameter=new HashMap();
        for(FaxEntity fax :faxEntities){
            pameter.put("faxId",fax.getId());
            pameter.put("reviewType","1");
            List<FaxReview> df = faxReviewMapper.selectByMap(pameter);
            fax.setDfList(df);
            pameter.put("reviewType","0");
            List<FaxReview> pl = faxReviewMapper.selectByMap(pameter);
            fax.setPlList(pl);
        }
        PageInfo<FaxEntity> page=new PageInfo<FaxEntity>(faxEntities);
        return page;
    }
}
