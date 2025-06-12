package com.techelevator.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Valid;

import com.techelevator.dao.CampaignDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Campaign;

@RestController
@CrossOrigin
@RequestMapping("/campaign")
public class CampaignController {
    private CampaignDao campaignDao;
    private UserDao userDao;

    public CampaignController(CampaignDao campaignDao, UserDao userDao) {
        this.campaignDao = campaignDao;
        this.userDao = userDao; 
    }

    @GetMapping(path = "/")
    public List<Campaign> getAllCampaigns() {
        try {
            return campaignDao.getAllCampaigns();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }


    @GetMapping(path = "/{id}")
    public Campaign getCampaignById(@PathVariable int id) {
        Campaign output = null;
        try {
            output = campaignDao.getCampaignById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
        if (output == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaign not found");
        }
        return output;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/")
    public Campaign addNewCampaign(@Valid @RequestBody Campaign incoming, Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User must be authenticated");
        }

        try {
            int userId = userDao.getUserByUsername(principal.getName()).getId();
            return campaignDao.addCampaign(userId, incoming);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }

    @PutMapping(path = "/{id}")
    public Campaign updateCampaign(@PathVariable int id, @Valid @RequestBody Campaign incoming) {
        Campaign existing = campaignDao.getCampaignById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaign not found");
        }
        try {
            return campaignDao.updateCampaign(incoming);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "/{id}")
    public void deleteCampaignById(@PathVariable int id) {
        int rowsAffected = 0;
        try {
            rowsAffected = campaignDao.deleteCampaignById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
        if (rowsAffected == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
