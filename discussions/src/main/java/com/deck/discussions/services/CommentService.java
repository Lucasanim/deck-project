package com.deck.discussions.services;

import com.deck.discussions.dto.CommentDTO;
import com.deck.discussions.models.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    Optional<Comment> findById(Long id);
    Comment save(CommentDTO comment);
    Comment update(CommentDTO comment);
    void delete(Long id);
    void deleteByDiscussionId(Long discussionId);
}
