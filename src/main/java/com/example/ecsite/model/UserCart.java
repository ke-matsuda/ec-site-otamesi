package com.example.ecsite.model;

import java.util.List;
public class UserCart {
    private int id;
    private String username;
    private List<CartItem> cartItems; 

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public List<CartItem> getCartItems() { return cartItems; }
    public void setCartItems(List<CartItem> cartItems) { this.cartItems = cartItems; }
}
