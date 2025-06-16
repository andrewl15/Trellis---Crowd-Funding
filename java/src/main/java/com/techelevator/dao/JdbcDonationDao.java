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
                "donation_date, first_name, last_name, donor_email \r\n" + //
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
        String sql = "insert into donation (campaign_id, user_id, amount, donation_date, first_name, last_name, donor_email) "
                +
                "values (?, ?, ?, ?, ?, ?, ?) returning donation_id;";
        try {

            int donationId = jdbcTemplate.queryForObject(sql, int.class,
                    donation.getCampaignId(),
                    donation.getUserId(),
                    donation.getAmount(),
                    donation.getDonationDate(),
                    donation.getFirstName(),
                    donation.getLastName(),
                    donation.getEmail());

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
    public List<Donation> getDonationsByCampaignId(int campaignId) {
        return null;
    }

    @Override
    public List<Donation> getDonationsByUserId(Integer userId) {
        return null;
    }

    @Override
    public int deleteDonationById(int donationId) {
        return 0;
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
        donation.setEmail(results.getString("donor_email"));
        return donation;
    }
}
