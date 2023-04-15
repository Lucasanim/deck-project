package com.deck.discussions.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "comment")
@Getter
@Setter
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
}
