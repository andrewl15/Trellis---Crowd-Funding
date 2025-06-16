package com.techelevator.model;

public class PollUsers {
    private Integer poll_id;
    private Integer poll_option_id;
    private Integer user_id;
    private String poll_option_title;

    public PollUsers(){

    }

    public PollUsers(int poll_id, int poll_option_id, String poll_option_title){
        this.poll_id = poll_id;
        this.poll_option_id = poll_option_id;
        this.poll_option_title = poll_option_title;
    }

    public int getPoll_id(){
        return poll_id;
    }

    public void setPoll_id(){
        this.poll_id = poll_id;
    }

    public int getPoll_option_id(){
        return getPoll_option_id();
    }

    public void setPoll_Option_Id(){
        this.poll_option_id = poll_option_id;
    }

    public int getUser_Id(){
        return user_id;
    }

    public void setUser_Id(){
        this.user_id = user_id;
    }

    public String getPoll_Option_Title(){
        return poll_option_title;
    }

    public void setPoll_Option_Title(){
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
