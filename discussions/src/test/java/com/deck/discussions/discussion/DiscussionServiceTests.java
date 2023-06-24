package com.deck.discussions.discussion;

import com.deck.discussions.dto.DiscussionDTO;
import com.deck.discussions.services.DiscussionService;
import com.deck.discussions.utils.DiscussionTestsUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

@SpringJUnitConfig
@SpringBootTest
@Rollback
public class DiscussionServiceTests {

    private final DiscussionService discussionService;

    @Autowired
    public DiscussionServiceTests(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @Test
    @Transactional
    public void testDiscussionCreation() {
        DiscussionDTO discussionDTO = DiscussionTestsUtils.generateDiscussion();
        discussionService.saveNew(discussionDTO);
    }

}
