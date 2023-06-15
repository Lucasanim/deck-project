package com.deck.discussions.dto;

import com.deck.discussions.dto.external.PublicUserDTO;
import com.deck.discussions.models.Comment;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDetailDTO {
    private Long id;
    private Long creatorId;
    private String creatorUserName;
    private String body;
    private Long discussionId;
    private Date createdAt;
    private Date updatedAt;
    private Date deletedAt;

    public static CommentDetailDTO from(Comment comment) {
        return CommentDetailDTO.builder()
                .id(comment.getId())
                .body(comment.getBody())
                .creatorId(comment.getCreatorId())
                .discussionId(comment.getDiscussion().getId())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .deletedAt(comment.getDeletedAt())
                .build();
    }

    public void setUserInformation(PublicUserDTO userDTO) {
        this.creatorUserName = userDTO.getUsername();
    }
}
