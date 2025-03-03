package com.example.ecsite.mapper;

import com.example.ecsite.model.Product;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

/**
 * 商品のマッパー.
 */
@Mapper
public interface ProductMapper {
  /**
   * 商品の全件取得.
   *
   * @return 商品の一覧
   */
  List<Product> findAll();
}
