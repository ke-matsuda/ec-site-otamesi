package com.example.ecsite.controller;

import com.example.ecsite.model.Product;
import com.example.ecsite.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 商品まわりのコントローラー. <br>
 * 商品一覧の取得や商品に関する情報の取得を行う.<br>
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
  private ProductService productService;

  /**
   * コンストラクタ.<br>
   * 商品まわりのロジックを処理するサービスを設定する
   *
   * @param productService 商品まわりのロジックを処理するサービス
   */
  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  /**
   * 商品一覧を取得する.
   *
   * @return 商品一覧のリスト
   */
  @GetMapping
  public List<Product> getProducts() {
    return productService.getAllProducts();
  }
}
