package com.deck.discussions.discussion;

import com.deck.discussions.dto.CommentDTO;
import com.deck.discussions.dto.DiscussionDTO;
import com.deck.discussions.models.Discussion;
import com.deck.discussions.services.CommentService;
import com.deck.discussions.services.DiscussionService;
import com.deck.discussions.utils.DiscussionTestsUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringJUnitConfig
@SpringBootTest
@Rollback
public class DiscussionServiceTests {

    private final DiscussionService discussionService;
    private final CommentService commentService;

    @Autowired
    public DiscussionServiceTests(DiscussionService discussionService, CommentService commentService) {
        this.discussionService = discussionService;
        this.commentService = commentService;
    }

    @Test
    @Transactional
    public void testDiscussionCreation() {
        Long userId = 10L;
        DiscussionDTO discussionDTO = DiscussionTestsUtils.generateDiscussion(userId);
        discussionService.saveNew(discussionDTO);

        List<Discussion> userDiscussions = discussionService.findByCreatorId(userId);

        Assertions.assertEquals(1, userDiscussions.size());

        CommentDTO firstComment = DiscussionTestsUtils.generateComment(userId, userDiscussions.get(0).getId());
        CommentDTO secondComment = DiscussionTestsUtils.generateComment(userId, userDiscussions.get(0).getId());
        commentService.save(firstComment);
        commentService.save(secondComment);

        Assertions.assertEquals(2, commentService.getCommentsByDiscussionId(userDiscussions.get(0).getId(), PageRequest.of(0, 10)).size());
    }

}
