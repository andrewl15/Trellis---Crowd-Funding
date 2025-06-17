package com.techelevator.model;

import java.math.BigDecimal;

public class CampaignUpdateDto {
    private BigDecimal raisedAmount;
    
    public BigDecimal getRaisedAmount() {
        return raisedAmount;
    }

    public void setRaisedAmount(BigDecimal raisedAmount) {
        this.raisedAmount = raisedAmount;
    }
}
