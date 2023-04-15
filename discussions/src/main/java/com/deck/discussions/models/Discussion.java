package com.deck.discussions.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "discussion")
@Getter
@Setter
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

    @OneToMany(orphanRemoval = true)
    private List<Comment> comments;

    private Date createdAt = new Date();

    private Date updatedAt = new Date();

    private Date deletedAt;
}
