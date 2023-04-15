package com.deck.discussions.dto;

import com.deck.discussions.models.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class CommentDTO {
    private Long id;
    private Long creatorId;
    private String body;
    private Long discussionId;
    private Date createdAt;
    private Date updatedAt;
    private Date deletedAt;

    public static CommentDTO from(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .body(comment.getBody())
                .creatorId(comment.getCreatorId())
                .discussionId(comment.getDiscussion().getId())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .deletedAt(comment.getDeletedAt())
                .build();
    }
}
