package com.deck.discussions.repositories;

import com.deck.discussions.models.Discussion;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DiscussionRepository extends CrudRepository<Discussion, Long> {
    List<Discussion> findByTitle(String title);
    List<Discussion> findByCreatorId(Long creatorId);
}
