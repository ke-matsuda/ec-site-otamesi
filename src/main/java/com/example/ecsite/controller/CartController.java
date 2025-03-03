package com.example.ecsite.controller;

import com.example.ecsite.service.CartService;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * カートのコントローラー. <br>
 * カートに製品を入れたり、除いたりする.<br>
 * カート内の数量の更新も行う.
 */
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
  private CartService cartService;

  /**
   * コンストラクタ.<br>
   * カートのロジックを処理するサービスを設定する
   *
   * @param cartService カートのロジックを処理するサービス
   */
  public CartController(CartService cartService) {
    this.cartService = cartService;
  }

  /**
   * カートに商品を追加する.
   *
   * @param id 商品のID
   * @param request リクエスト
   * @return レスポンス
   */
  @PostMapping("/{id}")
  public ResponseEntity<String> addProduct(@PathVariable int id,
      @RequestBody Map<String, Integer> request) {
    int userId = request.get("userId");
    cartService.addProduct(userId, id);
    ResponseEntity.ok("test");
    return ResponseEntity.ok("Added to cart");
  }

  /**
   * カートから削除する.
   *
   * @param id 商品ID
   * @param request リクエスト
   * @return レスポンス
   */
  @DeleteMapping("/{id}/remove-product/{userId}")
  public ResponseEntity<String> removeProduct(@PathVariable int id, @PathVariable int userId) {
    cartService.removeProduct(userId, id);
    return ResponseEntity.ok("Remove from cart");

  }

  /**
   * カート内の商品の数量を変更する.
   *
   * @param id 商品ID
   * @param request リクエスト
   * @return レスポンス
   */
  @PatchMapping("/{id}/update-quantity")
  public ResponseEntity<String> updateQuantity(@PathVariable int id,
      @RequestBody Map<String, Integer> request) {
    int userId = request.get("userId");
    int quantity = request.get("quantity");

    cartService.updateCartQuantity(userId, id, quantity);
    return ResponseEntity.ok("Quantity updated");
  }

}
