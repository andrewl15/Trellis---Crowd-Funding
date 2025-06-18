package com.techelevator.dao;

import com.techelevator.model.Polls;
import com.techelevator.model.PollOption;
import com.techelevator.model.PollUsers;

import java.util.List;

public interface PollDao {

    Polls getPollById(int pollId); 
    Polls getPollByCampaignId(int campaignId); 
    Polls createPoll(Polls poll); 
    Polls updatePoll(Polls poll);

    List<PollOption> getPollOptionsByPollId(int pollId); 
    PollOption getOptionById(int optionId); 
    PollOption createPollOption(PollOption pollOption, int pollId);  
    Integer getPollOptionCountById(int optionId); 

    Integer getPollUserCountByPollOption(int optionId);


    Polls deletePollByCampaignId(int id); 

    
}
