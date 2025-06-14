import axios from "axios";

export default {
    getDonationById(donationId) {
        return axios.get(`/donation/${donationId}`);
    },
    
    createDonation(donationData) {
        return axios.post('/donation/', donationData);
    }
}