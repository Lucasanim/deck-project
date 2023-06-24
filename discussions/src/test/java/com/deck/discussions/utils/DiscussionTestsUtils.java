package com.deck.discussions.utils;

import com.deck.discussions.dto.DiscussionDTO;

import java.util.Date;

public class DiscussionTestsUtils {

    public static DiscussionDTO generateDiscussion() {
        return DiscussionDTO.builder()
                .title("discussionTitle")
                .body("discussionBody")
                .createdAt(new Date())
                .creatorId(1L)
                .build();
    }
}
