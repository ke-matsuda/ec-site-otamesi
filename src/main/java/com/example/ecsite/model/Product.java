package com.example.ecsite.model;

/**
 * 商品の情報を表す.
 */
public class Product {
  private long id;
  private String name;
  private String description;
  private double price;
  private String imageurl;

  public long getId() {
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

  public double getPrice() {
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

}
