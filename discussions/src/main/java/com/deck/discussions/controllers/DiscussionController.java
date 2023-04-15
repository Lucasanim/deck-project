package com.deck.discussions.controllers;

import com.deck.discussions.models.Discussion;
import com.deck.discussions.services.DiscussionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
public class DiscussionController {

    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @GetMapping("/{discussionId}")
    public ResponseEntity<Discussion> getDiscussionById(@PathVariable("discussionId") Long id) {
        Optional<Discussion> optionalDiscussion = this.discussionService.findById(id);
        if (optionalDiscussion.isPresent()) {
            return ResponseEntity.ok(optionalDiscussion.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createDiscussion(@Valid @RequestBody Discussion discussion, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return this.getValidationErrorResponse(bindingResult);
        }
        Discussion createdDiscussion = this.discussionService.save(discussion);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDiscussion);
    }

    @PutMapping("/{discussionId}")
    public ResponseEntity<?> updateDiscussion(@Valid @RequestBody Discussion discussion, BindingResult bindingResult, @PathVariable("discussionId") Long discussionId) {
        if (bindingResult.hasErrors()) {
            return this.getValidationErrorResponse(bindingResult);
        }
        Optional<Discussion> optionalDiscussion = this.discussionService.findById(discussionId);
        if (optionalDiscussion.isPresent()) {
            Discussion queriedDiscussion = optionalDiscussion.get();
            return ResponseEntity.status(HttpStatus.CREATED).body(this.discussionService.update(queriedDiscussion));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{discussionId}")
    public ResponseEntity<?> deleteDiscussion(@PathVariable("discussionId") Long discussionId) {
        Optional<Discussion> optionalDiscussion = this.discussionService.findById(discussionId);
        if (optionalDiscussion.isPresent()) {
            this.discussionService.delete(discussionId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    private ResponseEntity<Map<String, String>> getValidationErrorResponse(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();
        bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

}
