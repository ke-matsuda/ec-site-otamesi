package com.example.ecsite.service;
import com.example.ecsite.mapper.ProductMapper;
import com.example.ecsite.model.Product;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ProductService {
    private final ProductMapper productMapper;
    public ProductService(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }
    public List<Product> getAllProducts() {
        return productMapper.findAll(); 
    }

	public void addToCart(int userId, int productId) {
		productMapper.addToCart(userId, productId);
	}
	public void removeFromCart(int userId, int productId) {
		productMapper.removeFromCart(userId, productId);
	}
	
	public void updateCartQuantity(int userId, int productId, int quantity) {
	    productMapper.updateQuantity(userId, productId, quantity);
	}

}