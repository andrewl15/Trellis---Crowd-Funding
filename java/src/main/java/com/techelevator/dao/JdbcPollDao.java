package com.techelevator.dao;



import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import com.techelevator.exception.DaoException;
import org.springframework.security.access.prepost.PreAuthorize;
import com.techelevator.model.Polls;
import com.techelevator.model.PollOption;
import com.techelevator.model.PollUsers;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcPollDao implements PollDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcPollDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Polls getPollById(int pollId){
        Polls poll = null;
        String sql = "Select * from polls where poll_id = ?;";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, pollId);
            if(results.next()) {
                poll = mapRowToPoll(results);
            }
        } catch (CannotGetJdbcConnectionException e){
            throw new DaoException("Unable to connect to server or database", e);
        }

        return poll;
    }

    @Override
    public Polls getPollByCampaignId(int campaignId) {
        Polls poll = null;
        String sql ="Select * from polls where campaign_id = ?;";
        try {
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql, campaignId);
            if (result.next()) {
                poll = mapRowToPoll(result);
                }
            } catch (CannotGetJdbcConnectionException e) {
                throw new DaoException("Unable to connect to server or database", e);
            }
        return poll;
    }

    @Override 
    public Polls updatePoll(Polls poll) {
        Polls updatedPoll = null;
        String sql = "UPDATE polls SET poll_name = ? WHERE poll_id = ?";
        try {
            int rowsAffected = jdbcTemplate.update(sql, poll.getName(), poll.getId());
            // if (rowsAffected == 0) {
            //     throw new DaoException("0  rows affected");
            // }
            updatedPoll = getPollById(rowsAffected);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to update poll due to data integrity violation", e);
        }
        return updatedPoll;
    }
    
    @Override
    public Polls createPoll(Polls poll) {
        Polls createdPoll = null;
        String sql = "insert into Polls(campaign_id,poll_name) VALUES(?,?) returning poll_id;";

        try{
            int pollid = jdbcTemplate.queryForObject(sql, int.class, poll.getCampaignId(), poll.getName());
            createdPoll = getPollById(pollid);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return createdPoll;
    }

    @Override
    public List<PollOption> getPollOptionsByPollId(int pollId) {
        List<PollOption> pollOptions = new ArrayList<>();
        String sql = "Select * from poll_option where poll_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, pollId);
            while (results.next()) {
                PollOption pollOption = mapRowToPollOption(results);
                pollOptions.add(pollOption);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return pollOptions;
    }

    @Override
    public PollOption getOptionById(int optionId) {
        PollOption pollOption = null;
        String sql = "Select * from poll_option where poll_option_id = ?";
        try {
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql, optionId);
            if (result.next()) {
                pollOption = mapRowToPollOption(result);
            } 
        } catch (CannotGetJdbcConnectionException e) {
                throw new DaoException("Unable to connect to server or database", e);
        }
        return pollOption;
    }

    @Override
    public PollOption createPollOption(PollOption polloption, int pollId) {
        PollOption createdOption = null;
        String sql = "INSERT INTO poll_option(poll_id, poll_option_title) Values (?, ?) returning poll_option_id;";

        try{
            int optionId = jdbcTemplate.queryForObject(sql, int.class, pollId, polloption.getName());
            createdOption = getOptionById(optionId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("unable to connect to server or database", e);
        }
        return createdOption;
    } 

    @Override
    public Integer getPollOptionCountById(int optionId) {
        Integer count = null;
        String sql = "select count(poll_users_id) as vote_count from poll_users where poll_option_id = ?";
        try {
            count = jdbcTemplate.queryForObject(sql, Integer.class, optionId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return count;
    }

    @Override
    public Integer getPollUserCountByPollOption(int optionId) {
        Integer voteCount = null;
        String sql = "select count(user_id) as vote_count from poll_users where poll_option_id = ?";
        try {
            voteCount = jdbcTemplate.queryForObject(sql, Integer.class, optionId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return voteCount;
    }


    @Override
    public Polls deletePollByCampaignId(int id) {
        Polls deletedPoll = null;
        String sql = "DELETE FROM polls WHERE campaign_id = ? RETURNING *";
        try {
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql, id);
            if (result.next()) {
                deletedPoll = mapRowToPoll(result);
            }
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Cannot delete poll with existing options or users", e);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return deletedPoll;
    }

    private Polls mapRowToPoll(SqlRowSet result) {
        Polls poll = new Polls();
        poll.setId(result.getInt("poll_id"));
        poll.setName(result.getString("poll_name"));
        poll.setCampaignId(result.getInt("campaign_id"));
        return poll;
    }

    private PollOption mapRowToPollOption(SqlRowSet result){
        PollOption PollOption = new PollOption();
        PollOption.setId(result.getInt("poll_option_id"));
        PollOption.setPollId(result.getInt("poll_id"));
        PollOption.setName(result.getString("poll_option_title"));
        return PollOption;
    }

    private PollUsers mapRowToPollUsers(SqlRowSet results) {
        PollUsers pollUsers = new PollUsers();
        pollUsers.setPoll_id(results.getInt("poll_id"));
        pollUsers.setUser_Id(results.getInt("user_id"));
        pollUsers.setPoll_Option_Id(results.getInt("poll_option_id"));
        return pollUsers;
    }
    
}


    
    

// Polls getPollByCampaignId(int campaignId);
// Polls createPoll(Polls poll);

// List<PollOption> getPollOptionsByPollId(int pollId);
// PollOption getOptionById(int optionId);
// PollOption createPollOption(PollOption pollOption);
// Integer getPollOptionCountById(int optionId);

// PollUsers getPollUsersByPollIdandUserId(int pollId, int userId);
