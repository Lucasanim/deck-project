package com.deck.discussions.dto;

import com.deck.discussions.models.Comment;
import com.deck.discussions.models.Discussion;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class DiscussionDTO {
    private Long id;
    private Long creatorId;
    private String title;
    private String body;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private Date deletedAt;

    public static DiscussionDTO from(Discussion discussion) {
        return DiscussionDTO.builder()
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
