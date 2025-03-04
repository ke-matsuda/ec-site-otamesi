package com.example.ecsite.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 商品のマッパー.
 */
@Mapper
public interface CartMapper {

  /**
   * カートに追加する.
   *
   * @param userId ログインユーザーのID
   * @param productId 商品のID
   */
  void addProduct(@Param("userId") int userId, @Param("productId") int productId);

  /**
   * カートから削除する.
   *
   * @param userId ログインユーザーのID
   * @param productId 商品のID
   */
  void removeProduct(@Param("userId") int userId, @Param("productId") int productId);

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
