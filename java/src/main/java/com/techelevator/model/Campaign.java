package com.techelevator.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class Campaign {
    @NotNull
    private int id;
    @NotNull
    private String imageUrl;
    @NotEmpty
    private String category;
    @NotEmpty
    private String name;
    private String description;
    @NotNull
    private BigDecimal goalAmount;
    private BigDecimal amountRaised;
    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;

    public Campaign() {
    }

    public Campaign(int id, String imageUrl, String category, String name, String description, BigDecimal goalAmount, LocalDate startDate, LocalDate endDate) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.category = category;
        this.name = name;
        this.description = description;
        this.goalAmount = goalAmount;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getGoalAmount() {
        return goalAmount;
    }

    public void setGoalAmount(BigDecimal goalAmount) {
        this.goalAmount = goalAmount;
    }

    public BigDecimal getAmountRaised() {
        return amountRaised;
    }

    public void setAmountRaised(BigDecimal amountRaised) {
        this.amountRaised = amountRaised;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "Campaign{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
