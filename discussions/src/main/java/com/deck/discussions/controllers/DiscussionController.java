package com.deck.discussions.controllers;

import com.deck.discussions.dto.DiscussionDTO;
import com.deck.discussions.dto.DiscussionDetailDTO;
import com.deck.discussions.models.Discussion;
import com.deck.discussions.services.CommentService;
import com.deck.discussions.services.DiscussionService;
import com.deck.discussions.utils.validation.ValidationError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/discussion")
public class DiscussionController {

    private final DiscussionService discussionService;
    private final CommentService commentService;

    public DiscussionController(DiscussionService discussionService, CommentService commentService) {
        this.discussionService = discussionService;
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<DiscussionDTO>> getDiscussions() {
        List<Discussion> discussions = this.discussionService.findAll();
        return ResponseEntity.ok(discussions.stream().map(DiscussionDTO::from).toList());
    }

    @GetMapping("/{discussionId}")
    public ResponseEntity<DiscussionDetailDTO> getDiscussionById(@RequestHeader("Authorization") String accessToken, @PathVariable("discussionId") Long id) {
        Optional<DiscussionDetailDTO> optionalDiscussion = this.discussionService.getDiscussionDetail(id, accessToken);
        return optionalDiscussion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createDiscussion(@Valid @RequestBody DiscussionDTO discussion, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ValidationError.getValidationErrorResponse(bindingResult);
        }
        Discussion createdDiscussion = this.discussionService.saveNew(discussion);
        return ResponseEntity.status(HttpStatus.CREATED).body(DiscussionDTO.from(createdDiscussion));
    }

    @PutMapping("/{discussionId}")
    public ResponseEntity<?> updateDiscussion(@Valid @RequestBody DiscussionDTO discussion, BindingResult bindingResult, @PathVariable("discussionId") Long discussionId) {
        if (bindingResult.hasErrors()) {
            return ValidationError.getValidationErrorResponse(bindingResult);
        }
        Optional<Discussion> optionalDiscussion = this.discussionService.findById(discussionId);
        if (optionalDiscussion.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(DiscussionDTO.from(discussionService.update(discussion)));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{discussionId}")
    public ResponseEntity<?> deleteDiscussion(@PathVariable("discussionId") Long discussionId) {
        Optional<Discussion> optionalDiscussion = this.discussionService.findById(discussionId);
        if (optionalDiscussion.isPresent()) {
            discussionService.delete(discussionId);
            commentService.deleteByDiscussionId(discussionId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

}
