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
@RequestMapping(path = "/campaign/polls")
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

    @GetMapping(path = "/option/{optionId}")
    public PollOption getOptionById(@PathVariable int optionId) {
        PollOption pollOption = null;
        try {
            pollOption = pollDao.getOptionById(optionId);
            if (pollOption == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Poll option not found for ID: " + optionId);
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
        return pollOption;
    }

    @GetMapping(path = "/options/{pollId}")
    public List<PollOption> getPollOptionsByPollId(@PathVariable int pollId) {
        List<PollOption> pollOptions = new ArrayList<>();
        try {
            pollOptions = pollDao.getPollOptionsByPollId(pollId);
            if (pollOptions.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No poll options found for Poll ID: " + pollId);
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
        return pollOptions;
    }

    @GetMapping(path = "/option/count/{optionId}")
    public Integer getPollOptionCountById(@PathVariable int optionId) {
        Integer count = null;
        try {
            count = pollDao.getPollOptionCountById(optionId);
            if (count == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No votes found for Poll Option ID: " + optionId);
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
        return count;
    }

    @GetMapping(path = "/user/count/{optionId}")
    public Integer getPollUserCountByPollOption(@PathVariable int optionId) {
        Integer voteCount = null;
        try {
            voteCount = pollDao.getPollUserCountByPollOption(optionId);
            if (voteCount == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No users found for Poll Option ID: " + optionId);
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
        return voteCount;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "/{id}")
    public void deletePollByCampaignId(@PathVariable int id, @RequestParam int campaignId) {
        int rowsAffected = 0;
        try {
            rowsAffected = pollDao.deletePollByCampaignId(id, campaignId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
        if (rowsAffected == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/")
    public Polls createPoll(@RequestBody Polls poll) {
        try {
            return pollDao.createPoll(poll);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/{pollId}/option")
    public PollOption createPollOption(@RequestBody PollOption pollOption, @PathVariable int pollId) {
        try {
            return pollDao.createPollOption(pollOption, pollId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }

}
