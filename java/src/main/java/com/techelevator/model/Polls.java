package com.techelevator.model;

import java.util.Arrays;

public class Polls {
    private int id;
    private String name;
    private int campaignId;
    private String[] options;

    private String pollTitle;

    public String getPollTitle() {
        return this.pollTitle;
    }

    public void setPollTitle(String pollTitle) {
        this.pollTitle = pollTitle;
    }

    public String[] getOptions() {
        return this.options;
    }

    public void setOptions(String [] options) {
        this.options = options;
    }

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
        return pollTitle + " " + campaignId + " " +  Arrays.toString(options);
    }
}
