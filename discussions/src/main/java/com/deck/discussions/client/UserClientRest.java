package com.deck.discussions.client;

import com.deck.discussions.dto.external.PublicUserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@FeignClient(name = "userClientRest", url = "${deck.users.url}" )
public interface UserClientRest {

    @GetMapping("/{userId}")
    PublicUserDTO getUserById(@RequestHeader("Authorization") String bearerToken, @PathVariable Long userId);

    @PostMapping("/users-by-id")
    List<PublicUserDTO> getUsersById(@RequestHeader("Authorization") String bearerToken, @RequestBody Set<Long> userIds);
}
