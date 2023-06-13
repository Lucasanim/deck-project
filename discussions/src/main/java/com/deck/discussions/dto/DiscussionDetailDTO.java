package com.deck.discussions.dto;

import com.deck.discussions.models.Discussion;
import lombok.*;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscussionDetailDTO {
    private Long id;
    private Long creatorId;
    private String creatorUserName;
    private String title;
    private String body;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private Date deletedAt;

    public static DiscussionDetailDTO from(Discussion discussion) {
        return DiscussionDetailDTO.builder()
                .id(discussion.getId())
                .creatorId(discussion.getCreatorId())
                .title(discussion.getTitle())
                .body(discussion.getBody())
                .createdAt(discussion.getCreatedAt())
                .updatedAt(discussion.getUpdatedAt())
                .deletedAt(discussion.getDeletedAt())
                .build();
    }

}
