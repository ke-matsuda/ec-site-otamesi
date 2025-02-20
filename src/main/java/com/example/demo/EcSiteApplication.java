package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * ECサイト起動用クラス.
 */
@SpringBootApplication
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
