package com.deck.discussions.models;

import com.deck.discussions.dto.DiscussionDTO;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "discussion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Discussion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long creatorId;

    @NotEmpty
    private String title;

    @NotEmpty
    private String body;

    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Comment> comments;

    private Date createdAt = new Date();

    private Date updatedAt = new Date();

    private Date deletedAt;

    public void addComment(Comment comment) {
        if (comments == null) {
            comments = new ArrayList<>();
        }
        comments.add(comment);
    }

    public static Discussion from(DiscussionDTO discussion, List<Comment> comments) {
        return Discussion.builder()
                .id(discussion.getId())
                .creatorId(discussion.getCreatorId())
                .title(discussion.getTitle())
                .body(discussion.getBody())
                .comments(comments)
                .createdAt(discussion.getCreatedAt())
                .updatedAt(discussion.getUpdatedAt())
                .deletedAt(discussion.getDeletedAt())
                .build();
    }
}
