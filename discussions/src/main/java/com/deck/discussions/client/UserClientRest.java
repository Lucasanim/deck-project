package com.deck.discussions.client;

import com.deck.discussions.dto.external.PublicUserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "userClientRest", url = "${deck.users.url}" )
public interface UserClientRest {

    @GetMapping("/{userId}")
    PublicUserDTO getUserById(@RequestHeader("Authorization") String bearerToken, @PathVariable Long userId);
}
