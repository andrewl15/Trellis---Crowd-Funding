package com.techelevator.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class Donation {
    @NotNull
    private int donationId;
    @NotNull
    private int campaignId;
    private int userId;
    @NotNull
    private BigDecimal amount;
    @NotNull
    private LocalDate donationDate;
    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;
    @NotEmpty
    private String email;

    public Donation() {
    }

    public Donation(int donationId, int campaignId, int userId, BigDecimal amount, LocalDate donationDate, String firstName, String lastName, String email) {
        this.donationId = donationId;
        this.campaignId = campaignId;
        this.userId = userId;
        this.amount = amount;
        this.donationDate = donationDate;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
                ", email='" + email + '\'' +
                '}';
    }
}
