import { useState } from 'react';
import CampaignService from '../../services/CampaignService';
import { useNavigate } from 'react-router-dom';

export default function CampaignView() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start >= end) {
            alert('End date must be after start date.');
            return;
        }

        const campaignData = {
            name,
            description,
            startDate,
            endDate
        };
        CampaignService.createCampaign(campaignData)
            .then(response => {
                if(response.status === 201) {
                    alert('Campaign Created!');
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Error creating campaign:', error);
            });
    }

    return (
        <div>
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Campaign Name</label>
                            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea name="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label>Start Date</label>
                            <input type="date" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                        </div>
                        <div>
                            <label>End Date</label>
                            <input type="date" name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                        </div>
                        <div>
                            <button type="submit">Create Campaign</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
