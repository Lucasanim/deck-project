package com.deck.discussions.services;

import com.deck.discussions.dto.DiscussionDTO;
import com.deck.discussions.models.Discussion;
import com.deck.discussions.repositories.DiscussionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DiscussionServiceImpl implements DiscussionService {

    private final DiscussionRepository repository;

    public DiscussionServiceImpl(DiscussionRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Discussion> findAll() {
        return (List<Discussion>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Discussion> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Discussion> findByTitle(String title) {
        return repository.findByTitle(title);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Discussion> findByIds(Iterable<Long> ids) {
        return (List<Discussion>) repository.findAllById(ids);
    }

    @Override
    @Transactional
    public Discussion save(Discussion discussion) {
        return repository.save(discussion);
    }

    @Override
    @Transactional
    public Discussion saveNew(DiscussionDTO discussionDTO) {
        return repository.save(Discussion.from(discussionDTO, new ArrayList<>()));
    }

    @Override
    @Transactional
    public Discussion update(DiscussionDTO discussionDTO) {
        discussionDTO.setUpdatedAt(new Date());
        Discussion discussion = repository.findById(discussionDTO.getId()).orElseThrow();

        return save(Discussion.from(discussionDTO, discussion.getComments()));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Discussion discussion = findById(id).orElseThrow();
        discussion.setDeletedAt(new Date());

        save(discussion);
    }
}
