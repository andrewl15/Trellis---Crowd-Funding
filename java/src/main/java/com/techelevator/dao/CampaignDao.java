package com.techelevator.dao;

import java.util.List;

import com.techelevator.model.Campaign;

public interface CampaignDao {
    List<Campaign> getAllCampaigns();
    Campaign getCampaignById(int id);
    Campaign addCampaign(int userId, Campaign campaign);
    Campaign updateCampaign(Campaign campaign);
    int deleteCampaignById(int id);
}
