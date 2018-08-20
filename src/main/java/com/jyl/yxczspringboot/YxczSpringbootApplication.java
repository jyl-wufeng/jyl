package com.jyl.yxczspringboot;

import com.jyl.yxczspringboot.interceptor.LoginInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@MapperScan(value = "com.jyl.yxczspringboot.*.mapper")
@ServletComponentScan
@SpringBootApplication
public class YxczSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(YxczSpringbootApplication.class, args);
	}



}
