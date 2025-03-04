package com.example.ecsite.controller;

import com.example.ecsite.model.CartItem;
import com.example.ecsite.model.User;
import com.example.ecsite.service.UserService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ユーザーまわりのリクエストを処理するコントローラー.
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {
  private final UserService userService;

  /**
   * コンストラクタ.<br>
   * ユーザーまわりの内部処理をするサービスを設定する
   *
   * @param userService ユーザーまわりの内部処理をするサービス.
   */
  public UserController(UserService userService) {
    this.userService = userService;
  }

  /**
   * ログインユーザーの情報を取得する.
   *
   * @return レスポンス
   */
  @GetMapping("/current")
  public ResponseEntity<User> getCurrentUser() {
    User user = userService.getUserWithCart(1); // ※便宜上今回は"1"で固定.
    return ResponseEntity.ok(user);
  }

  /**
   * ログインユーザーの情報とそのカート情報とカート内の商品の商品名を取得する.
   *
   * @return レスポンス
   */
  @GetMapping("/cartitems")
  public ResponseEntity<List<CartItem>> findCartItemsByUserId() {
    List<CartItem> cartItem = userService.findCartItemsByUserId(1); // user1のIDを指定
    System.out.println(cartItem);
    return ResponseEntity.ok(cartItem);
  }

}
