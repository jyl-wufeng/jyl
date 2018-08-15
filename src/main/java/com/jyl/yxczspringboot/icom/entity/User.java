package com.jyl.yxczspringboot.icom.entity;

public class User {
    private String loginName;
    private String loginPass;

    public String getLoginName() {
        return loginName;
    }

    public String getLoginPass() {
        return loginPass;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public void setLoginPass(String loginPass) {
        this.loginPass = loginPass;
    }
}
