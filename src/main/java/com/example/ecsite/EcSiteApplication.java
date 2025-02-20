package com.example.ecsite;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ECサイト起動用クラス.
 */
@SpringBootApplication
@MapperScan("com.example.ecsite.mapper")
public class EcSiteApplication {
  /**
   * メイン.
   *
   * @param args 文字列の配列
   */
  public static void main(String[] args) {
    SpringApplication.run(EcSiteApplication.class, args);
  }
}
