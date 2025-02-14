package com.example.ecsite;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;
@SpringBootApplication
@MapperScan("com.example.ecsite.mapper") // Mapper インターフェースのパッケージを指定
public class EcSiteApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcSiteApplication.class, args);
    }
}