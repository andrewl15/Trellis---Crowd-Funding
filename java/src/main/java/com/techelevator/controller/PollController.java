package com.techelevator.controller;
import com.techelevator.exception.DaoException;

import org.apache.tomcat.util.net.NioEndpoint.PollerEvent;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.techelevator.model.Donation;
import com.techelevator.model.PollOption;
import com.techelevator.model.PollUsers;
import com.techelevator.model.Polls;
import com.techelevator.dao.PollDao;
import com.techelevator.dao.UserDao;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping( path = "/campaign/polls")
public class PollController {
        private PollDao pollDao;

    public PollController(PollDao pollDao) {
        this.pollDao = pollDao;
    }

    @GetMapping(path = "/{id}")
    public Polls getPollByCampaignId(@PathVariable int id) {
        Polls poll = null;
        try {
            poll = pollDao.getPollByCampaignId(id);
            if (poll == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Poll not found for campaign ID: " + id);
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
        return poll;
    }
}
