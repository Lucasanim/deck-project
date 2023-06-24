package com.deck.users.user;

import com.deck.users.models.User;
import com.deck.users.services.UserService;
import com.deck.users.utils.UserTestsUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

@SpringJUnitConfig
@SpringBootTest
@Rollback
public class UserServiceTests {

    private final UserService userService;

    @Autowired
    public UserServiceTests(UserService userService) {
        this.userService = userService;
    }

    @Test
    @Transactional
    public void testUserCreation() {
        String userEmailAddress = "example@domain.com";
        User user = UserTestsUtils.generateUserByEmail(userEmailAddress);

        userService.save(user);

        Assertions.assertTrue(userService.userExists(userEmailAddress));
    }

    @Test
    @Transactional
    public void testUserDeletion() {
        String userEmailAddress = "example@domain.com";
        User user = UserTestsUtils.generateUserByEmail(userEmailAddress);

        userService.save(user);
        userService.delete(user.getId());

        Assertions.assertFalse(userService.userExists(userEmailAddress));
    }

    @Test
    @Transactional
    public void testUserUpdate() {
        User user = UserTestsUtils.generateUserByEmail("example@domain.com");
        userService.save(user);

        String newEmailAddress = "new-example@domain.com";
        user = userService.findByEmail(user.getEmail()).get();
        user.setEmail(newEmailAddress);
        userService.save(user);

        Assertions.assertTrue(userService.userExists(newEmailAddress));
    }

}
