package com.techelevator.model;

public class PollUsers {
    private int poll_users_id;
    private Integer poll_id;
    private Integer poll_option_id;
    private Integer user_id;
    

    public PollUsers(){

    }

    public PollUsers(int poll_users_id, Integer poll_id, Integer poll_option_id){
        this.poll_users_id = poll_users_id;
        this.poll_id = poll_id;
        this.poll_option_id = poll_option_id;
    }

    public int getPoll_users_id(){
        return poll_users_id;
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

    @Override
    public String toString(){
        return "poll_users{" +
                "poll_users_id=" + poll_users_id +
                ", poll_id=" + poll_id +
                ", poll_option_id=" + poll_option_id +
                ", user_id=" + user_id +
                ", poll_option_title=" +
                '}';
    }

}
