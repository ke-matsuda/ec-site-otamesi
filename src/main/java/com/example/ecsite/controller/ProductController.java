package com.example.ecsite.controller;

import com.example.ecsite.model.Product;
import com.example.ecsite.service.ProductService;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 商品まわりのコントローラー. <br>
 * カートに製品を入れたり、除いたりする.<br>
 * カート内の数量の更新も行う.
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

  /**
   * カートに追加する.
   *
   * @param id 商品のID
   * @param request リクエスト
   * @return レスポンス
   */
  @PostMapping("/{id}/add-to-cart")
  public ResponseEntity<?> addToCart(@PathVariable int id,
      @RequestBody Map<String, Integer> request) {
    int userId = request.get("userId");
    productService.addToCart(userId, id);
    return ResponseEntity.ok("Added to cart");
  }

  /**
   * カートから削除する.
   *
   * @param id 商品ID
   * @param request リクエスト
   * @return レスポンス
   */
  @PostMapping("/{id}/remove-from-cart")
  public ResponseEntity<?> removFromCart(@PathVariable int id,
      @RequestBody Map<String, Integer> request) {
    int userId = request.get("userId");
    productService.removeFromCart(userId, id);
    return ResponseEntity.ok("Remove from cart");
  }

  /**
   * カート内の商品の数量を変更する.
   *
   * @param id 商品ID
   * @param request リクエスト
   * @return レスポンス
   */
  @PostMapping("/{id}/update-quantity")
  public ResponseEntity<?> updateQuantity(@PathVariable int id,
      @RequestBody Map<String, Integer> request) {
    int userId = request.get("userId");
    int quantity = request.get("quantity");

    productService.updateCartQuantity(userId, id, quantity);
    return ResponseEntity.ok("Quantity updated");
  }

}
