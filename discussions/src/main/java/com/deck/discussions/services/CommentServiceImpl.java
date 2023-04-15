package com.deck.discussions.services;

import com.deck.discussions.dto.CommentDTO;
import com.deck.discussions.models.Comment;
import com.deck.discussions.models.Discussion;
import com.deck.discussions.repositories.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository repository;
    private final DiscussionService discussionService;

    public CommentServiceImpl(CommentRepository repository, DiscussionService discussionService) {
        this.repository = repository;
        this.discussionService = discussionService;
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
    public void deleteByDiscussionId(Long discussionId) {
        List<Comment> comments = repository.findByDiscussionId(discussionId);
        comments.forEach(comment -> {
            comment.setDeletedAt(new Date());
            save(comment);
        });
    }
}
