package com.deck.discussions.repositories;

import com.deck.discussions.models.Comment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findByDiscussionId(Long discussionId);

    List<Comment> findByCreatorId(Long creatorId);
}
