package com.techelevator.model;

public class Polls {
    private int id;
    private String name;
    private int campaignId;

    public Polls() {
    }

    public Polls(int id, String name, int campaignId) {
        this.id = id;
        this.name = name;
        this.campaignId = campaignId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(int campaignId) {
        this.campaignId = campaignId;
    }

    @Override
    public String toString() {
        return "Polls{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", campaignId=" + campaignId +
                '}';
    }
}
