package com.deck.discussions.repositories;

import com.deck.discussions.models.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findByDiscussionId(Long discussionId);

    Page<Comment> findByDiscussionId(Long discussionId, Pageable pageable);

    List<Comment> findByCreatorId(Long creatorId);
}
