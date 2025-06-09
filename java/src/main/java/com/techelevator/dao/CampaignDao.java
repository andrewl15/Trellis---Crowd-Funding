package com.techelevator.dao;

import com.techelevator.model.Campaign;

public interface CampaignDao {
    Campaign getCampaignById(int id);
    Campaign addCampaign(Campaign campaign);
}
