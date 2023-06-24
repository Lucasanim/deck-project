package com.deck.discussions.services;

import com.deck.discussions.dto.CommentDTO;
import com.deck.discussions.dto.CommentDetailDTO;
import com.deck.discussions.models.Comment;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    Optional<Comment> findById(Long id);
    Comment save(CommentDTO comment);
    Comment update(CommentDTO comment);
    void delete(Long id);
    List<CommentDetailDTO> getCommentDetailsByDiscussionId(Long discussionId, String authenticationHeader, Pageable pageable);
    List<Comment> getCommentsByDiscussionId(Long discussionId, Pageable pageable);
    void deleteByDiscussionId(Long discussionId);
}
