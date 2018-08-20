package com.jyl.yxczspringboot.icom.fax.entity;

import java.util.List;

public class FaxEntity {
    private String id;

    private String title;

    private String content;

    private String personName;

    private String personId;

    private String personDept;

    private String personTel;

    private String createDate;

    private String faxType;

    private String statu;

    private String noReason;

    private String isTop;

    private String topEndtime;

    private String clickNumber;

    private String supportNum;

    private String negativeNum;

    private String acceptName;

    private String acceptNameIds;

    private String pubTime;

    private String alertTime;

    private String extend1;

    private String extend2;

    private String extend3;

    private String extend4;

    private String extend5;

    private List<FaxReview> dfList;

    private List<FaxReview> plList;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName == null ? null : personName.trim();
    }

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId == null ? null : personId.trim();
    }

    public String getPersonDept() {
        return personDept;
    }

    public void setPersonDept(String personDept) {
        this.personDept = personDept == null ? null : personDept.trim();
    }

    public String getPersonTel() {
        return personTel;
    }

    public void setPersonTel(String personTel) {
        this.personTel = personTel == null ? null : personTel.trim();
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate == null ? null : createDate.trim();
    }

    public String getFaxType() {
        return faxType;
    }

    public void setFaxType(String faxType) {
        this.faxType = faxType == null ? null : faxType.trim();
    }

    public String getStatu() {
        return statu;
    }

    public void setStatu(String statu) {
        this.statu = statu == null ? null : statu.trim();
    }

    public String getNoReason() {
        return noReason;
    }

    public void setNoReason(String noReason) {
        this.noReason = noReason == null ? null : noReason.trim();
    }

    public String getIsTop() {
        return isTop;
    }

    public void setIsTop(String isTop) {
        this.isTop = isTop == null ? null : isTop.trim();
    }

    public String getTopEndtime() {
        return topEndtime;
    }

    public void setTopEndtime(String topEndtime) {
        this.topEndtime = topEndtime == null ? null : topEndtime.trim();
    }

    public String getClickNumber() {
        return clickNumber;
    }

    public void setClickNumber(String clickNumber) {
        this.clickNumber = clickNumber == null ? null : clickNumber.trim();
    }

    public String getSupportNum() {
        return supportNum;
    }

    public void setSupportNum(String supportNum) {
        this.supportNum = supportNum == null ? null : supportNum.trim();
    }

    public String getNegativeNum() {
        return negativeNum;
    }

    public void setNegativeNum(String negativeNum) {
        this.negativeNum = negativeNum == null ? null : negativeNum.trim();
    }

    public String getAcceptName() {
        return acceptName;
    }

    public void setAcceptName(String acceptName) {
        this.acceptName = acceptName == null ? null : acceptName.trim();
    }

    public String getAcceptNameIds() {
        return acceptNameIds;
    }

    public void setAcceptNameIds(String acceptNameIds) {
        this.acceptNameIds = acceptNameIds == null ? null : acceptNameIds.trim();
    }

    public String getPubTime() {
        return pubTime;
    }

    public void setPubTime(String pubTime) {
        this.pubTime = pubTime == null ? null : pubTime.trim();
    }

    public String getAlertTime() {
        return alertTime;
    }

    public void setAlertTime(String alertTime) {
        this.alertTime = alertTime == null ? null : alertTime.trim();
    }

    public String getExtend1() {
        return extend1;
    }

    public void setExtend1(String extend1) {
        this.extend1 = extend1 == null ? null : extend1.trim();
    }

    public String getExtend2() {
        return extend2;
    }

    public void setExtend2(String extend2) {
        this.extend2 = extend2 == null ? null : extend2.trim();
    }

    public String getExtend3() {
        return extend3;
    }

    public void setExtend3(String extend3) {
        this.extend3 = extend3 == null ? null : extend3.trim();
    }

    public String getExtend4() {
        return extend4;
    }

    public void setExtend4(String extend4) {
        this.extend4 = extend4 == null ? null : extend4.trim();
    }

    public String getExtend5() {
        return extend5;
    }

    public void setExtend5(String extend5) {
        this.extend5 = extend5 == null ? null : extend5.trim();
    }

    public List<FaxReview> getDfList() {
        return dfList;
    }

    public List<FaxReview> getPlList() {
        return plList;
    }

    public void setDfList(List<FaxReview> dfList) {
        this.dfList = dfList;
    }

    public void setPlList(List<FaxReview> plList) {
        this.plList = plList;
    }
}