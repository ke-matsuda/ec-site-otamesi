package com.example.ecsite.mapper;

import com.example.ecsite.model.Product;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 商品のマッパー.
 */
@Mapper
public interface CartMapper {
  /**
   * 全件検索.
   *
   * @return 商品の一覧
   */
  List<Product> findAll();

  /**
   * カートに追加する.
   *
   * @param userId ログインユーザーのID
   * @param productId 商品のID
   */
  void addToCart(@Param("userId") int userId, @Param("productId") int productId);

  /**
   * カートから削除する.
   *
   * @param userId ログインユーザーのID
   * @param productId 商品のID
   */
  void removeFromCart(@Param("userId") int userId, @Param("productId") int productId);

  /**
   * カート内の商品の数量を更新する.
   *
   * @param userId ユーザーID
   * @param productId 商品ID
   * @param quantity 更新後の数量
   */
  void updateQuantity(@Param("userId") int userId, @Param("productId") int productId,
      @Param("quantity") int quantity);
}
