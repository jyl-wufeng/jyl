package com.jyl.yxczspringboot.icom.base.entity;

public class BaseResult {
    private boolean status;
    private String message;

    public boolean getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setMessage(String massage) {
        this.message = massage;
    }
}
