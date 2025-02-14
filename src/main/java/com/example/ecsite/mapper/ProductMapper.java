package com.example.ecsite.mapper;
import com.example.ecsite.model.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;
@Mapper
public interface ProductMapper {
    List<Product> findAll();

	void addToCart(@Param("userId")int userId,@Param("productId") int productId);

	void removeFromCart(@Param("userId")int userId,@Param("productId") int productId);
	
	void updateQuantity(@Param("userId")int userId,@Param("productId") int productId,@Param("quantity") int quantity);

}