package com.deck.discussions.dto;

import com.deck.discussions.models.Comment;
import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private Long id;
    @NotNull
    private Long creatorId;
    @NotEmpty
    private String body;
    @NotNull
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
