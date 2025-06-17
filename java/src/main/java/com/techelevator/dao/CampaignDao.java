package com.techelevator.dao;

import java.math.BigDecimal;
import java.util.List;

import com.techelevator.model.Campaign;

public interface CampaignDao {
    List<Campaign> getAllCampaigns();
    List<Campaign> getCampaignsByUserId(int id);
    Campaign getCampaignById(int id);
    Integer getUserIdByCampaignId(int campaignId);
    Campaign addCampaign(int userId, Campaign campaign);
    Campaign updateCampaign(Campaign campaign);
    Campaign updateCampaignRaisedAmountById(BigDecimal amount, int id);
    int deleteCampaignById(int id);
}
