package com.jyl.yxczspringboot.icom.fax.entity;

public class FaxReview {
    private String id;

    private String faxId;

    private String faxConnent;

    private String reviewUsername;

    private String reviewUserid;

    private String reviewDept;

    private String createDate;

    private String reviewType;

    private String reviewAgree;

    private String reviewOrder;

    private String extend1;

    private String extend2;

    private String extend3;

    private String extend4;

    private String extend5;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getFaxId() {
        return faxId;
    }

    public void setFaxId(String faxId) {
        this.faxId = faxId == null ? null : faxId.trim();
    }

    public String getFaxConnent() {
        return faxConnent;
    }

    public void setFaxConnent(String faxConnent) {
        this.faxConnent = faxConnent == null ? null : faxConnent.trim();
    }

    public String getReviewUsername() {
        return reviewUsername;
    }

    public void setReviewUsername(String reviewUsername) {
        this.reviewUsername = reviewUsername == null ? null : reviewUsername.trim();
    }

    public String getReviewUserid() {
        return reviewUserid;
    }

    public void setReviewUserid(String reviewUserid) {
        this.reviewUserid = reviewUserid == null ? null : reviewUserid.trim();
    }

    public String getReviewDept() {
        return reviewDept;
    }

    public void setReviewDept(String reviewDept) {
        this.reviewDept = reviewDept == null ? null : reviewDept.trim();
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate == null ? null : createDate.trim();
    }

    public String getReviewType() {
        return reviewType;
    }

    public void setReviewType(String reviewType) {
        this.reviewType = reviewType == null ? null : reviewType.trim();
    }

    public String getReviewAgree() {
        return reviewAgree;
    }

    public void setReviewAgree(String reviewAgree) {
        this.reviewAgree = reviewAgree == null ? null : reviewAgree.trim();
    }

    public String getReviewOrder() {
        return reviewOrder;
    }

    public void setReviewOrder(String reviewOrder) {
        this.reviewOrder = reviewOrder == null ? null : reviewOrder.trim();
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

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", faxId=").append(faxId);
        sb.append(", faxConnent=").append(faxConnent);
        sb.append(", reviewUsername=").append(reviewUsername);
        sb.append(", reviewUserid=").append(reviewUserid);
        sb.append(", reviewDept=").append(reviewDept);
        sb.append(", createDate=").append(createDate);
        sb.append(", reviewType=").append(reviewType);
        sb.append(", reviewAgree=").append(reviewAgree);
        sb.append(", reviewOrder=").append(reviewOrder);
        sb.append(", extend1=").append(extend1);
        sb.append(", extend2=").append(extend2);
        sb.append(", extend3=").append(extend3);
        sb.append(", extend4=").append(extend4);
        sb.append(", extend5=").append(extend5);
        sb.append("]");
        return sb.toString();
    }
}