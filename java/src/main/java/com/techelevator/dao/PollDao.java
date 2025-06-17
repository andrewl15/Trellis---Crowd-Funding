package com.techelevator.dao;

import com.techelevator.model.Polls;
import com.techelevator.model.PollOption;
import com.techelevator.model.PollUsers;

import java.util.List;

public interface PollDao {

    Polls getPollById(int pollId); //done
    Polls getPollByCampaignId(int campaignId); //done
    Polls createPoll(Polls poll); //done

    List<PollOption> getPollOptionsByPollId(int pollId); //in progress 
    PollOption getOptionById(int optionId); //done
    PollOption createPollOption(PollOption pollOption, int pollId); //done //confused how to check
    Integer getPollOptionCountById(int optionId);

    PollUsers getPollUsersByPollIdandUserId(int pollId, int userId);
    Polls deletePollByCampaignId(int id);
}
