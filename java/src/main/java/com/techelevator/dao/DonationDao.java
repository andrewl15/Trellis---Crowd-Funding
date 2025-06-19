package com.techelevator.dao;

import java.util.List;

import com.techelevator.model.Donation;

public interface DonationDao {
    Donation getDonationById(int donationId);
    Donation createDonation(Donation donation);
    int getDonationCountByCampaignId(int campaignId);
    List<Donation> getDonationsByUserId(Integer userId);
    List<Donation> getThreeHighestDonationsByCampaignId(int campaignId);
    int deleteDonationsByCampaignId(int campaignId);
} 
