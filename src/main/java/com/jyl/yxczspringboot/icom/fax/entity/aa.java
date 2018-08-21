package com.jyl.yxczspringboot.icom.fax.entity;

import java.util.Date;

public class aa {
    private String id;

    private String manageUserid;

    private String manageName;

    private String extend1;

    private String extend2;

    private String extend3;

    private String extend4;

    //2测试
    private Date extend5;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getManageUserid() {
        return manageUserid;
    }

    public void setManageUserid(String manageUserid) {
        this.manageUserid = manageUserid == null ? null : manageUserid.trim();
    }

    public String getManageName() {
        return manageName;
    }

    public void setManageName(String manageName) {
        this.manageName = manageName == null ? null : manageName.trim();
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

    public Date getExtend5() {
        return extend5;
    }

    public void setExtend5(Date extend5) {
        this.extend5 = extend5;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", manageUserid=").append(manageUserid);
        sb.append(", manageName=").append(manageName);
        sb.append(", extend1=").append(extend1);
        sb.append(", extend2=").append(extend2);
        sb.append(", extend3=").append(extend3);
        sb.append(", extend4=").append(extend4);
        sb.append(", extend5=").append(extend5);
        sb.append("]");
        return sb.toString();
    }
}