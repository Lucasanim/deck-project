package com.deck.discussions.services;

import com.deck.discussions.client.UserClientRest;
import com.deck.discussions.dto.DiscussionDTO;
import com.deck.discussions.dto.DiscussionDetailDTO;
import com.deck.discussions.dto.external.PublicUserDTO;
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
    private final UserClientRest userClient;

    public DiscussionServiceImpl(DiscussionRepository repository, UserClientRest userClient) {
        this.repository = repository;
        this.userClient = userClient;
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
    public Optional<DiscussionDetailDTO> getDiscussionDetail(Long id, String authenticationHeader) {
        Optional<Discussion> discussion = findById(id);
        if (discussion.isEmpty()) return Optional.empty();
        DiscussionDetailDTO discussionDetail = DiscussionDetailDTO.from(discussion.get());
        PublicUserDTO userData = userClient.getUserById(authenticationHeader, discussionDetail.getCreatorId());
        discussionDetail.setCreatorUserName(userData.getUsername());
        return Optional.of(discussionDetail);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DiscussionDTO> searchByTitle(String inputText){
        List<Discussion> discussions = repository.findByTitleContaining(inputText);
        return discussions.stream().map(DiscussionDTO::from).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Discussion> findByIds(Iterable<Long> ids) {
        return (List<Discussion>) repository.findAllById(ids);
    }

    @Override
    public List<Discussion> findByCreatorId(Long creatorId) {
        return repository.findByCreatorId(creatorId);
    }

    @Override
    @Transactional
    public Discussion save(Discussion discussion) {
        return repository.save(discussion);
    }

    @Override
    @Transactional
    public Discussion saveNew(DiscussionDTO discussionDTO) {
        discussionDTO.setCreatedAt(new Date());
        discussionDTO.setUpdatedAt(new Date());
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
