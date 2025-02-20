package com.example.ecsite.model;

/**
 * 商品情報のゲッターとセッター.
 */
public class Product {
  private Long id;
  private String name;
  private String description;
  private Double price;
  private String imageurl;
  private Boolean isInCart;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public String getImage() {
    return imageurl;
  }

  public void setImage(String imageural) {
    this.imageurl = imageural;
  }

  public Boolean getIsInCart() {
    return isInCart;
  }

  public void setIsInCart(Boolean isInCart) {
    this.isInCart = isInCart;
  }
}
