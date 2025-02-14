package com.example.ecsite.controller;

import com.example.ecsite.model.Product;
import com.example.ecsite.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products") 
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	private  ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@GetMapping
	public List<Product> getProducts() {
		return productService.getAllProducts();
	}

	@PostMapping("/{id}/add-to-cart")
	public ResponseEntity<?> addToCart(@PathVariable int id, @RequestBody Map<String, Integer> request) {
		int userId = request.get("userId"); 
		productService.addToCart(userId, id);
		return ResponseEntity.ok("Added to cart");
	}

	@PostMapping("/{id}/remove-from-cart")
	public ResponseEntity<?> removFromCart(@PathVariable int id, @RequestBody Map<String, Integer> request) {
		int userId = request.get("userId"); 
		productService.removeFromCart(userId, id);
		return ResponseEntity.ok("Remove from cart");
	}

	@PostMapping("/{id}/update-quantity")
	public ResponseEntity<?> updateQuantity(@PathVariable int id, @RequestBody Map<String, Integer> request) {
		int userId = request.get("userId");
		int quantity = request.get("quantity");


		productService.updateCartQuantity(userId, id, quantity);
		return ResponseEntity.ok("Quantity updated");
	}

}