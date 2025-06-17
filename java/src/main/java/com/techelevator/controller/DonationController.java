package com.techelevator.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.techelevator.dao.DonationDao;
import com.techelevator.model.Donation;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/donation")
public class DonationController{
    private DonationDao donationDao;

    private DonationController(DonationDao donationDao) {
        this.donationDao = donationDao;
    }

    @GetMapping(path = "/campaign/{campaignId}")
    public int getDonationsByCampaignId(@PathVariable int campaignId) {
        try {
            return donationDao.getDonationCountByCampaignId(campaignId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }


    @GetMapping(path = "/{id}")
    public Donation getDonationById(@PathVariable int id){
        Donation output = null;
        try {
            output = donationDao.getDonationById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
        if (output == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Donation not found");
        }
        return output;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/")
    public Donation createDonation(@Valid @RequestBody Donation incoming) {
        try {
            return donationDao.createDonation(incoming);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }
    public List<Donation> getDonationsByUserId(int userId) {
        return null;
    }
    public void deleteDonationById(@PathVariable int donationId) {
    }

}
