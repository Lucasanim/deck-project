package com.deck.discussions.services;

import com.deck.discussions.models.Comment;
import com.deck.discussions.models.Discussion;
import com.deck.discussions.repositories.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository repository;

    public CommentServiceImpl(CommentRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Comment> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Comment save(Comment comment) {
        return repository.save(comment);
    }

    @Override
    @Transactional
    public Comment update(Comment comment) {
        comment.setUpdatedAt(new Date());

        return save(comment);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Comment comment = findById(id).orElseThrow();
        comment.setDeletedAt(new Date());

        save(comment);
    }
}
