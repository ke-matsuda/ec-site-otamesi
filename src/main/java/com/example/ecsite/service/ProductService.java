package com.example.ecsite.service;

import com.example.ecsite.mapper.ProductMapper;
import com.example.ecsite.model.Product;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * 商品に関するサービス.
 */
@Service
public class ProductService {
  private final ProductMapper productMapper;

  /**
   * コンストラクタ.<br>
   * 商品に関するマッパーを設定する
   *
   * @param productMapper 商品に関するマッパー
   */
  public ProductService(ProductMapper productMapper) {
    this.productMapper = productMapper;
  }

  /**
   * 全商品の情報を取得する.
   *
   * @return 商品のリスト
   */
  public List<Product> getAllProducts() {
    return productMapper.findAll();
  }
}
