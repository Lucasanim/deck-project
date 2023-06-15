package com.deck.discussions.services;

import com.deck.discussions.client.UserClientRest;
import com.deck.discussions.dto.CommentDTO;
import com.deck.discussions.dto.CommentDetailDTO;
import com.deck.discussions.dto.external.PublicUserDTO;
import com.deck.discussions.models.Comment;
import com.deck.discussions.models.Discussion;
import com.deck.discussions.repositories.CommentRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository repository;
    private final DiscussionService discussionService;
    private final UserClientRest userClient;

    public CommentServiceImpl(CommentRepository repository, DiscussionService discussionService, UserClientRest userClient) {
        this.repository = repository;
        this.discussionService = discussionService;
        this.userClient = userClient;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Comment> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Comment save(CommentDTO commentDTO) {
        Discussion discussion = discussionService.findById(commentDTO.getDiscussionId()).orElseThrow();
        Comment comment = Comment.from(commentDTO, discussion);
        Comment savedComment = save(comment);
        discussion.addComment(savedComment);
        discussionService.save(discussion);
        return savedComment;
    }

    private Comment save(Comment comment) {
        return repository.save(comment);
    }

    @Override
    @Transactional
    public Comment update(CommentDTO commentDTO) {
        commentDTO.setUpdatedAt(new Date());

        return save(commentDTO);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Comment comment = findById(id).orElseThrow();
        comment.setDeletedAt(new Date());

        save(CommentDTO.from(comment));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDetailDTO> getCommentDetailsByDiscussionId(Long discussionId, String authenticationHeader, Pageable pageable) {
        List<Comment> comments = repository.findByDiscussionId(discussionId, pageable).getContent();
        if (comments.isEmpty()) return new ArrayList<>();

        Set<Long> creatorIds = comments.stream().map(Comment::getCreatorId).collect(Collectors.toSet());
        List<PublicUserDTO> publicUserDTOList = userClient.getUsersById(authenticationHeader, creatorIds);
        Map<Long, PublicUserDTO> publicUserDTOMap = publicUserDTOList.stream().collect(Collectors.toMap(PublicUserDTO::getId, PublicUserDTO -> PublicUserDTO));

        return comments.stream().map(comment -> {
            CommentDetailDTO commentDetailDTO = CommentDetailDTO.from(comment);
            commentDetailDTO.setUserInformation(publicUserDTOMap.get(comment.getCreatorId()));
            return commentDetailDTO;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteByDiscussionId(Long discussionId) {
        List<Comment> comments = repository.findByDiscussionId(discussionId);
        comments.forEach(comment -> {
            comment.setDeletedAt(new Date());
            save(comment);
        });
    }
}
