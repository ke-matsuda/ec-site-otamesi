package com.example.ecsite.service;

import com.example.ecsite.mapper.UserMapper;
import com.example.ecsite.model.User;
import com.example.ecsite.model.UserCart;

import org.springframework.stereotype.Service;

@Service
public class UserService {
	private final UserMapper userMapper;

	public UserService(UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	public User getUserWithCart(int id) {
		return userMapper.findUserWithCart(id);
	}

	public UserCart getUserWithCartAndProductName(int id) {
		return userMapper.findUserWithCartAndProductName(id);
	}
}
