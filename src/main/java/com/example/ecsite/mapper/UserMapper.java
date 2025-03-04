package com.example.ecsite.mapper;

import com.example.ecsite.model.CartItem;
import com.example.ecsite.model.User;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * ユーザーのマッパー.
 */
@Mapper
public interface UserMapper {

  /**
   * ユーザー情報とそのユーザのカート情報（商品IDのみ）を取得する.
   *
   * @param userId ユーザーID
   * @return レスポンス
   */
  User findUserWithCart(@Param("userId") int userId);

  /**
   * ユーザIDをもとにカートの情報を取得する.
   *
   * @param userId ユーザーID
   * @return レスポンス
   */
  List<CartItem> findCartItemsByUserId(@Param("userId") int userId);
}
