package com.example.ecsite.model;

import java.util.List;

public class User {
    private int id;
    private String username;
    private List<Integer> cartItems; // カート内の商品IDリスト

    // ゲッターとセッター
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public List<Integer> getCartItems() { return cartItems; }
    public void setCartItems(List<Integer> cartItems) { this.cartItems = cartItems; }
}
