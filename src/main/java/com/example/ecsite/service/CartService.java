package com.example.ecsite.service;

import com.example.ecsite.mapper.CartMapper;
import org.springframework.stereotype.Service;

/**
 * カートに関するサービス.
 */
@Service
public class CartService {
  private final CartMapper cartMapper;

  /**
   * コンストラクタ.<br>
   * カートに関するマッパーを設定する
   *
   * @param carttMapper カートに関するマッパー
   */
  public CartService(CartMapper cartMapper) {
    this.cartMapper = cartMapper;
  }

  /**
   * カートに商品を追加をする.
   *
   * @param userId ユーザーID
   * @param productId 商品ID
   */
  public void addProduct(int userId, int productId) {
    cartMapper.addProduct(userId, productId);
  }

  /**
   * カートから削除する.
   *
   * @param userId ユーザーID
   * @param productId 商品ID
   */
  public void removeProduct(int userId, int productId) {
    cartMapper.removeProduct(userId, productId);
  }

  /**
   * カート内の商品の数量を更新する.
   *
   * @param userId ユーザーID
   * @param productId 商品ID
   * @param quantity 更新後の数量
   */
  public void updateCartQuantity(int userId, int productId, int quantity) {
    cartMapper.updateQuantity(userId, productId, quantity);
  }

}
