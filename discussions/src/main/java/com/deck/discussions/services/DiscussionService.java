package com.deck.discussions.services;

import com.deck.discussions.models.Discussion;

import java.util.List;
import java.util.Optional;

public interface DiscussionService {
    List<Discussion> findAll();
    Optional<Discussion> findById(Long id);
    List<Discussion> findByTitle(String title);
    List<Discussion> findByIds(Iterable<Long> ids);
    Discussion save(Discussion discussion);
    Discussion update(Discussion discussion);
    void delete(Long id);
}
