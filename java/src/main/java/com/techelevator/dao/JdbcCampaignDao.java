package com.techelevator.dao;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Campaign;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("isAuthenticated()")
@Component
public class JdbcCampaignDao implements CampaignDao {
    private DonationDao donationDao;
    private final JdbcTemplate jdbcTemplate;

    public JdbcCampaignDao(JdbcTemplate jdbcTemplate, DonationDao donationDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.donationDao = donationDao; 
    }

    @PreAuthorize("permitAll()")
    @Override
    public List<Campaign> getAllCampaigns() {
        List<Campaign> campaigns = new ArrayList<>();
        String sql = "select * from campaign;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Campaign campaign = mapRowToCampaign(results);
                campaigns.add(campaign);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return campaigns;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @Override
    public List<Campaign> getCampaignsByUserId(int id) {
        List<Campaign> campaigns = new ArrayList<>();
        String sql = "select c.campaign_id, c.image_url, c.name, c.description, c.category, c.goal_amount, c.raised_amount, c.start_date, c.end_date from campaign as c join user_campaign as uc on uc.campaign_id = c.campaign_id join users as us on us.user_id = uc.user_id where us.user_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
            while (results.next()) {
                Campaign campaign = mapRowToCampaign(results);
                campaigns.add(campaign);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return campaigns;
    }

    @PreAuthorize("permitAll()")
    @Override
    public Campaign getCampaignById(int id) {
        Campaign campaign = null;
        String sql = "select campaign_id, image_url, name, description, category, goal_amount, raised_amount, start_date, end_date from campaign where campaign_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
            if (results.next()) {
                campaign = mapRowToCampaign(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }

        return campaign;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @Override
    public Integer getUserIdByCampaignId(int campaignId) {
        Integer userId = null;
        String sql = "select user_id from user_campaign where campaign_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, campaignId);
            if (results.next()) {
                userId = results.getInt("user_id");
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return userId;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @Override
    public Campaign addCampaign(int userId, Campaign campaign) {
        Campaign newCampaign = null;
        String campaignSql = "INSERT INTO campaign (image_url, name, description, category, goal_amount, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING campaign_id;";
        String userCampaignSql = "INSERT INTO user_campaign (user_id, campaign_id) VALUES (?, ?);";

        try {
            int campaignId = jdbcTemplate.queryForObject(campaignSql, int.class,
                    campaign.getImageUrl(),
                    campaign.getName(), campaign.getDescription(), campaign.getCategory(), 
                    campaign.getGoalAmount(), campaign.getStartDate(), campaign.getEndDate());

            jdbcTemplate.update(userCampaignSql, userId, campaignId);
            newCampaign = getCampaignById(campaignId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException( e.getMessage());
        }

        return newCampaign;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @Override
    public Campaign updateCampaign(Campaign campaign) {
        Campaign updatedCampaign = null;
        String sql = "update campaign set name = ?, description = ?, category = ?, goal_amount = ?, raised_amount = ?, start_date = ?, end_date = ? where campaign_id = ?;";
        try {
            int rowsAffected = jdbcTemplate.update(sql,
                    campaign.getName(), campaign.getDescription(), campaign.getCategory(),
                    campaign.getGoalAmount(), campaign.getAmountRaised(), 
                    campaign.getStartDate(), campaign.getEndDate(),
                    campaign.getId());
            if (rowsAffected == 0) {
                throw new DaoException("Zero rows affected, expected at least one");
            }
            updatedCampaign = getCampaignById(rowsAffected);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return updatedCampaign;
    }

    @PreAuthorize("permitAll()")
    @Override
    public Campaign updateCampaignRaisedAmountById(BigDecimal amount, int id) {
        Campaign updatedCampaign = null;
        String sql = "update campaign set raised_amount = raised_amount + ? where campaign_id = ?;";
        try {
            int rowsAffected = jdbcTemplate.update(sql, amount, id);
            if (rowsAffected == 0) {
                throw new DaoException("Zero rows affected, expected at least one");
            }
            updatedCampaign = getCampaignById(rowsAffected);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return updatedCampaign;

    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @Override
    public int deleteCampaignById(int id) {
        int numberOfRowsAffected = 0;
        String campaignSql = "delete from campaign where campaign_id = ?;";
        String userCampaignSql = "delete from user_campaign where campaign_id = ?;";
        String pollSql = "delete from polls where campaign_id = ?;";
        try {
            donationDao.deleteDonationsByCampaignId(id);
            numberOfRowsAffected = jdbcTemplate.update(pollSql, id);
            numberOfRowsAffected += jdbcTemplate.update(userCampaignSql, id);
            numberOfRowsAffected += jdbcTemplate.update(campaignSql, id);
     
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException(e.getMessage());
        }
        return numberOfRowsAffected;
    }

    private Campaign mapRowToCampaign(SqlRowSet results) {
        Campaign campaign = new Campaign();
        campaign.setId(results.getInt("campaign_id"));
        campaign.setImageUrl(results.getString("image_url"));
        campaign.setName(results.getString("name"));
        campaign.setDescription(results.getString("description"));
        campaign.setCategory(results.getString("category"));
        campaign.setGoalAmount(results.getBigDecimal("goal_amount"));
        campaign.setAmountRaised(results.getBigDecimal("raised_amount"));
        campaign.setStartDate(LocalDate.parse(results.getString("start_date"), DateTimeFormatter.ISO_DATE));
        campaign.setEndDate(LocalDate.parse(results.getString("end_date"), DateTimeFormatter.ISO_DATE));
        return campaign;
    }

}
