package com.deck.discussions.services;

import com.deck.discussions.dto.DiscussionDTO;
import com.deck.discussions.dto.DiscussionDetailDTO;
import com.deck.discussions.models.Discussion;

import java.util.List;
import java.util.Optional;

public interface DiscussionService {
    List<Discussion> findAll();
    Optional<Discussion> findById(Long id);
    Optional<DiscussionDetailDTO> getDiscussionDetail(Long id, String authenticationHeader);
    List<Discussion> findByTitle(String title);
    List<Discussion> findByIds(Iterable<Long> ids);
    Discussion save(Discussion discussion);
    Discussion saveNew(DiscussionDTO discussion);
    Discussion update(DiscussionDTO discussion);
    void delete(Long id);
}
