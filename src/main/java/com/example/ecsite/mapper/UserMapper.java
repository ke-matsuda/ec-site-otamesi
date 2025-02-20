package com.example.ecsite.mapper;

import com.example.ecsite.model.User;
import com.example.ecsite.model.UserCart;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * ユーザーに関するSQLクエリとつなぐ.
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
   * ユーザー情報とそのユーザーのカート情報（商品IDと商品名）を取得する.
   *
   * @param userId ユーザーID
   * @return レスポンス
   */
  UserCart findUserWithCartAndProductName(@Param("userId") int userId);
}
