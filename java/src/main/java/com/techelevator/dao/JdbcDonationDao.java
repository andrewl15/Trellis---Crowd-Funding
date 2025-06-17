package com.techelevator.dao;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Donation;

@Component
public class JdbcDonationDao implements DonationDao {
    private final JdbcTemplate jdbcTemplate;

    public JdbcDonationDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Donation getDonationById(int donationId) {
        Donation donation = null;
        String sql = "select donation_id, campaign_id, user_id, amount, \r\n" + //
                "donation_date, first_name, last_name\r\n" + //
                "from donation where donation_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, donationId);
            if (results.next()) {
                donation = mapRowToDonation(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }

        return donation;
    }

    @Override
    public Donation createDonation(Donation donation) {
        Donation newDonation = null;
        String sql = "insert into donation (campaign_id, user_id, amount, donation_date, first_name, last_name) "
                +
                "values (?, ?, ?, ?, ?, ?) returning donation_id;";
        try {

            int donationId = jdbcTemplate.queryForObject(sql, int.class,
                    donation.getCampaignId(),
                    donation.getUserId(),
                    donation.getAmount(),
                    donation.getDonationDate(),
                    donation.getFirstName(),
                    donation.getLastName());
           
            newDonation = getDonationById(donationId);
           
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            throw new DaoException("Data integrity violation", e);
        }
        return newDonation;
    }

    @Override
    public int getDonationCountByCampaignId(int campaignId) {
        int totalDonations = 0;
        String sql = "select count(donation_id) as total_donations from donation where campaign_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, campaignId);
            if (results.next()) {
                totalDonations = results.getInt("total_donations");
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return totalDonations;
    }

    @Override
    public List<Donation> getDonationsByUserId(Integer userId) {
        return null;
    }

    @Override
    public int deleteDonationsByCampaignId(int campaignId) {
        int rowsDeleted = 0;
        String sql = "delete from donation where campaign_id = ?;";
        try {
            rowsDeleted = jdbcTemplate.update(sql, campaignId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return rowsDeleted;
    }

    private Donation mapRowToDonation(SqlRowSet results) {
        Donation donation = new Donation();
        donation.setDonationId(results.getInt("donation_id"));
        donation.setCampaignId(results.getInt("campaign_id"));
        int userId = results.getInt("user_id");
        if (results.wasNull()) {
            donation.setUserId(null);
        } else {
            donation.setUserId(userId);
        }
        donation.setAmount(results.getBigDecimal("amount"));
        donation.setDonationDate(LocalDate.parse(results.getString("donation_date"), DateTimeFormatter.ISO_DATE));
        donation.setFirstName(results.getString("first_name"));
        donation.setLastName(results.getString("last_name"));
        return donation;
    }
}
