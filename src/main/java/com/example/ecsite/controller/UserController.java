package com.example.ecsite.controller;

import com.example.ecsite.model.User;
import com.example.ecsite.model.UserCart;
import com.example.ecsite.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {
	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/current")
	public ResponseEntity<User> getCurrentUser() {
		User user = userService.getUserWithCart(1); // user1のIDを指定
		return ResponseEntity.ok(user);
	}

	@GetMapping("/cartitems")
	public ResponseEntity<UserCart> getUserWithCartAndProductName() {
		UserCart userCart = userService.getUserWithCartAndProductName(1); // user1のIDを指定
		return ResponseEntity.ok(userCart);
	}

}
