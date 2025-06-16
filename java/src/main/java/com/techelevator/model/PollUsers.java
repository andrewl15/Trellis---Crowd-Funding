package com.techelevator.model;

public class PollUsers {
    private Integer poll_id;
    private Integer poll_option_id;
    private Integer user_id;
    private String poll_option_title;

    public PollUsers(){

    }

    public PollUsers(Integer poll_id, Integer poll_option_id, String poll_option_title){
        this.poll_id = poll_id;
        this.poll_option_id = poll_option_id;
        this.poll_option_title = poll_option_title;
    }

    public Integer getPoll_id(){
        return poll_id;
    }

    public void setPoll_id(Integer poll_id){
        this.poll_id = poll_id;
    }

    public Integer getPoll_option_id(){
        return poll_option_id;
    }

    public void setPoll_Option_Id(Integer poll_option_id){
        this.poll_option_id = poll_option_id;
    }

    public Integer getUser_Id(){
        return user_id;
    }

    public void setUser_Id(Integer user_id){
        this.user_id = user_id;
    }

    public String getPoll_Option_Title(){
        return poll_option_title;
    }

    public void setPoll_Option_Title(String poll_option_title){
        this.poll_option_title = poll_option_title;
    }

    @Override
    public String toString(){
        return "poll_users{" +
                "poll_id=" + poll_id +
                ", poll_option_id=" + poll_option_id +
                ", user_id=" + user_id +
                ", poll_option_title=" + poll_option_title +
                '}';
    }

}
