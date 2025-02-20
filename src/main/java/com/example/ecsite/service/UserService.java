package com.example.ecsite.service;

import com.example.ecsite.mapper.UserMapper;
import com.example.ecsite.model.User;
import com.example.ecsite.model.UserCart;
import org.springframework.stereotype.Service;

/**
 * ユーザーサービス.
 */
@Service
public class UserService {
  private final UserMapper userMapper;

  /**
   * ユーザーサービス.
   *
   * @param userMapper ユーザーマッパー
   */
  public UserService(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  /**
   * ユーザー情報と紐づくカート情報を取得する.
   *
   * @param id ユーザーID
   * @return ユーザーと紐づくカート情報
   */
  public User getUserWithCart(int id) {
    return userMapper.findUserWithCart(id);
  }

  /**
   * ユーザー情報と紐づくカートおよび商品名を処理する.
   *
   * @param id ユーザーID
   * @return ユーザー情報と紐づくカートおよび商品名
   */
  public UserCart getUserWithCartAndProductName(int id) {
    return userMapper.findUserWithCartAndProductName(id);
  }
}
