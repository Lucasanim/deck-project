package com.deck.discussions.utils;

import com.deck.discussions.dto.CommentDTO;
import com.deck.discussions.dto.DiscussionDTO;

import java.util.Date;

public class DiscussionTestsUtils {

    public static DiscussionDTO generateDiscussion(Long userId) {
        return DiscussionDTO.builder()
                .title("discussionTitle")
                .body("discussionBody")
                .createdAt(new Date())
                .creatorId(userId)
                .build();
    }

    public static CommentDTO generateComment(Long userId, Long discussionId) {
        return CommentDTO.builder()
                .body("commentBody")
                .discussionId(discussionId)
                .creatorId(userId)
                .createdAt(new Date())
                .build();
    }
}
