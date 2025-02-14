package com.example.ecsite.mapper;

import com.example.ecsite.model.User;
import com.example.ecsite.model.UserCart;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    User findUserWithCart(@Param("userId") int userId);
    UserCart findUserWithCartAndProductName(@Param("userId")int userId);
}
