package com.example.ecsite.model;

import java.util.List;

/**
 * ユーザー情報を表す.
 */
public class User {
  private int id;
  private String username;
  private List<Product> productsInCart; // カート内の商品

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public List<Product> getProductsInCart() {
    return productsInCart;
  }

  public void setProductsInCart(List<Product> productsInCart) {
    this.productsInCart = productsInCart;
  }
}
