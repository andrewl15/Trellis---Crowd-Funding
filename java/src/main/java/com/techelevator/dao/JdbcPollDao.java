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

    // @Override
    // public Polls createPoll(Polls poll) {
    //     Polls createdPoll = null;

    // }

    private Polls mapRowToPoll(SqlRowSet result) {
        Polls poll = new Polls();
        poll.setId(result.getInt("poll_id"));
        poll.setName(result.getString("poll_name"));
        poll.setCampaignId(result.getInt("campaign_id"));
        return poll;
    }

    // private PollOption mapRowToPollOption(SqlRowSet)

    // private PollUsers mapRowToPollUsers(SqlRowSet)
    
}

// Polls getPollByCampaignId(int campaignId);
// Polls createPoll(Polls poll);

// List<PollOption> getPollOptionsByPollId(int pollId);
// PollOption getOptionById(int optionId);
// PollOption createPollOption(PollOption pollOption);
// Integer getPollOptionCountById(int optionId);

// PollUsers getPollUsersByPollIdandUserId(int pollId, int userId);
