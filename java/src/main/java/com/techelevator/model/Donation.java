package com.techelevator.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class Donation {
    @NotNull
    private int donationId;
    @NotNull
    private int campaignId;
    private Integer userId;
    @NotNull
    private BigDecimal amount;
    @NotNull
    private LocalDate donationDate;
    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;

    public Donation() {
    }

    public Donation(int donationId, int campaignId, Integer userId, BigDecimal amount, LocalDate donationDate, String firstName, String lastName) {
        this.donationId = donationId;
        this.campaignId = campaignId;
        this.userId = userId;
        this.amount = amount;
        this.donationDate = donationDate;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public int getDonationId() {
        return donationId;
    }

    public void setDonationId(int donationId) {
        this.donationId = donationId;
    }

    public int getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(int campaignId) {
        this.campaignId = campaignId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(LocalDate donationDate) {
        this.donationDate = donationDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    @Override
    public String toString() {
        return "Donation{" +
                "donationId=" + donationId +
                ", campaignId=" + campaignId +
                ", userId=" + userId +
                ", amount=" + amount +
                ", donationDate=" + donationDate +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}
