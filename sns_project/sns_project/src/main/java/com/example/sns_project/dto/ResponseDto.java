package com.example.sns_project.dto;

public class ResponseDto {
    private Integer statusCode;
    private String message;

    private Object result;

    public ResponseDto(Integer statusCode, String message, Object result) {
        this.statusCode = statusCode;
        this.message = message;
        this.result = result;
    }
    public ResponseDto(){};
}
