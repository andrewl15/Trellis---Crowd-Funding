package com.techelevator.model;

public class PollOption {
    private int id;
    private String name;
    private int pollId;

    public PollOption() {
    }

    public PollOption(int id, String name, int pollId) {
        this.id = id;
        this.name = name;
        this.pollId = pollId;
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

    public int getPollId() {
        return pollId;
    }

    public void setPollId(int pollId) {
        this.pollId = pollId;
    }

    @Override
    public String toString() {
        return "PollOption{" +
               "id=" + id +
               ", name='" + name + "/" +
               ", pollId=" + pollId +
               '}';
    }
}