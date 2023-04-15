package com.deck.discussions.services;

import com.deck.discussions.models.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    Optional<Comment> findById(Long id);
    Comment save(Comment comment);
    Comment update(Comment comment);
    void delete(Long id);
}
