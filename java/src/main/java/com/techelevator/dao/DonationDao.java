package com.techelevator.dao;

import java.math.BigDecimal;
import java.util.List;

import com.techelevator.model.Donation;

public interface DonationDao {
    Donation getDonationById(int donationId);
    Donation createDonation(Donation donation);
    List<Donation> getDonationsByCampaignId(int campaignId);
    List<Donation> getDonationsByUserId(int userId);
    int deleteDonationById(int donationId);

} 
