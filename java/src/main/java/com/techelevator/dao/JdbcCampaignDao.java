package com.techelevator.dao;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Campaign;
import org.springframework.jdbc.support.rowset.SqlRowSet;


@Component
public class JdbcCampaignDao implements CampaignDao{
    private final JdbcTemplate jdbcTemplate;

    public JdbcCampaignDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Campaign getCampaignById(int id) {
        Campaign campaign = null;
        String sql = "select campaign_id, name, description, start_date, end_date from campaign where campaign_id = ?;";
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

    @Override
    public Campaign addCampaign(Campaign campaign) {
        Campaign newCampaign = null;
        String sql = "insert into campaign (name, description, start_date, end_date) values (?, ?, ?, ?) returning campaign_id;";
        try{
            int campaignId = jdbcTemplate.queryForObject(sql, int.class, 
                            campaign.getName(), campaign.getDescription(), 
                            campaign.getStartDate(), campaign.getEndDate());
            newCampaign = getCampaignById(campaignId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }     
        return newCampaign;
    }

    private Campaign mapRowToCampaign(SqlRowSet results) {
        Campaign campaign = new Campaign();
        campaign.setId(results.getInt("campaign_id"));
        campaign.setName(results.getString("name"));
        campaign.setDescription(results.getString("description"));
        campaign.setStartDate(LocalDate.parse(results.getString("start_date"), DateTimeFormatter.ISO_DATE));
        campaign.setEndDate(LocalDate.parse(results.getString("end_date"), DateTimeFormatter.ISO_DATE));
        return campaign;
    }
    
}
