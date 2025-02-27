package com.example.ecsite.service;

import com.example.ecsite.mapper.ProductMapper;
import com.example.ecsite.model.Product;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * 商品に関するサービス.
 */
@Service
public class CartService {
  private final ProductMapper productMapper;

  /**
   * コンストラクタ.<br>
   * 商品に関するマッパーを設定する
   *
   * @param productMapper 商品に関するマッパー
   */
  public CartService(ProductMapper productMapper) {
    this.productMapper = productMapper;
  }

  public List<Product> getAllProducts() {
    return productMapper.findAll();
  }

  /**
   * カートに追加をする.
   *
   * @param userId ユーザーID
   * @param productId 商品ID
   */
  public void addToCart(int userId, int productId) {
    productMapper.addToCart(userId, productId);
  }

  /**
   * カートから削除する.
   *
   * @param userId ユーザーID
   * @param productId 商品ID
   */
  public void removeFromCart(int userId, int productId) {
    productMapper.removeFromCart(userId, productId);
  }

  /**
   * カート内の商品の数量を更新する.
   *
   * @param userId ユーザーID
   * @param productId 商品ID
   * @param quantity 更新後の数量
   */
  public void updateCartQuantity(int userId, int productId, int quantity) {
    productMapper.updateQuantity(userId, productId, quantity);
  }

}
