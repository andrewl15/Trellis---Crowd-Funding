import axios from 'axios';

export default {
    getPollByCampaignId: (campaignId) => {
        return axios.get(`/campaign/polls/${campaignId}`);
    },

    getOptionById: (optionId) => {
        return axios.get(`/campaign/polls/option/${optionId}`);
    },

    getPollOptionsByPollId: (pollId) => {
        return axios.get(`/campaign/polls/options/${pollId}`);
    },

    getPollOptionCountById: (optionId) => {
        return axios.get(`/campaign/polls/option/count/${optionId}`);
    },

    getPollUserCountByPollOption: (pollOptionId) => {
        return axios.get(`/campaign/polls/user/count/${pollOptionId}`);
    },

    createPoll: (poll) => {
        return axios.post('/campaign/polls', poll);
    },

    deletePollByCamopaignId: (campaignId) => {
        return axios.delete(`/campaign/polls/${campaignId}`);
    }

}