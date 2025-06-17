import axios from "axios";

export default {
    getDonationById(donationId) {
        return axios.get(`/donation/${donationId}`);
    },
    
    createDonation(donationData) {
        return axios.post('/donation/', donationData);
    },

    getDonationsByCampaignId(campaignId) {
        return axios.get(`/donation/campaign/${campaignId}`);
    }
}