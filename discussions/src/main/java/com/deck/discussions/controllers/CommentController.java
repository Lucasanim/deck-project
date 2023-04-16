package com.deck.discussions.controllers;

import com.deck.discussions.dto.CommentDTO;
import com.deck.discussions.models.Comment;
import com.deck.discussions.services.CommentService;
import com.deck.discussions.utils.validation.ValidationError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable("commentId") Long id) {
        Optional<Comment> optionalComment = commentService.findById(id);
        if (optionalComment.isPresent()) {
            return ResponseEntity.ok(CommentDTO.from(optionalComment.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createComment(@Valid @RequestBody CommentDTO comment, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ValidationError.getValidationErrorResponse(bindingResult);
        }
        Comment createdComment = commentService.save(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(CommentDTO.from(createdComment));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(@Valid @RequestBody CommentDTO comment, BindingResult bindingResult, @PathVariable("commentId") Long commentId) {
        if (bindingResult.hasErrors()) {
            return ValidationError.getValidationErrorResponse(bindingResult);
        }
        Optional<Comment> optionalComment = commentService.findById(commentId);
        if (optionalComment.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(CommentDTO.from(commentService.update(comment)));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId) {
        Optional<Comment> optionalComment = commentService.findById(commentId);
        if (optionalComment.isPresent()) {
            commentService.delete(commentId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-from-discussion/{discussionId}")
    public ResponseEntity<List<CommentDTO>> getCommentByDiscussionId(@PathVariable("discussionId") Long discussionId) {
        List<CommentDTO> comments = commentService.getCommentsByDiscussionId(discussionId);
        return ResponseEntity.ok(comments);
    }

}
