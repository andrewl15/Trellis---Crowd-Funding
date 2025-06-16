package com.techelevator.dao;

import com.techelevator.model.Polls;
import com.techelevator.model.PollOption;
import com.techelevator.model.PollUsers;

import java.util.List;

public interface PollDao {

    Polls getPollByCampaignId(int campaignId);
    Polls createPoll(Polls poll);

    List<PollOption> getPollOptionsByPollId(int pollId);
    PollOption getOptionById(int optionId);
    PollOption createPollOption(PollOption pollOption);
    Integer getPollOptionCountById(int optionId);

    PollUsers getPollUsersByPollIdandUserId(int pollId, int userId);
}
