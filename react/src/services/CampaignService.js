import axios from "axios";

export default {
    createCampaign(campaignData) {
        return axios.post('/campaign/', campaignData);
    },
    
    getCampaigns() {
        return axios.get('/campaign/');
    },
    
    getCampaignById(campaignId) {
        return axios.get(`/campaign/${campaignId}`);
    },
    
    updateCampaign(campaignId, campaignData) {
        return axios.put(`/campaign/${campaignId}`, campaignData);
    },
    
    deleteCampaign(campaignId) {
        return axios.delete(`/campaign/${campaignId}`);
    }
}