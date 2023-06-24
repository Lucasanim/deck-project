package com.deck.users.utils;

import com.deck.users.models.User;

public class UserTestsUtils {

    public static User generateUserByEmail(String email) {
        return User.builder()
                .email(email)
                .username("username")
                .password("password")
                .build();
    }

}
