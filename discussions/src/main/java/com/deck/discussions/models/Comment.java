package com.deck.discussions.models;

import com.deck.discussions.dto.CommentDTO;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long creatorId;

    @NotEmpty
    private String body;

    @ManyToOne
    private Discussion discussion;

    private Date createdAt;

    private Date updatedAt;

    private Date deletedAt;

    public static Comment from(CommentDTO comment, Discussion discussion) {
        return Comment.builder()
                .id(comment.getId())
                .body(comment.getBody())
                .creatorId(comment.getCreatorId())
                .discussion(discussion)
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .deletedAt(comment.getDeletedAt())
                .build();
    }
}
