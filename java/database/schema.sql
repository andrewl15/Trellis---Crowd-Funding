BEGIN TRANSACTION;

DROP TABLE IF EXISTS USERS CASCADE;
DROP TABLE IF EXISTS USER_PAYMENT CASCADE; 
DROP TABLE IF EXISTS CAMPAIGN CASCADE;
DROP TABLE IF EXISTS USER_CAMPAIGN;

CREATE TABLE users (
	user_id SERIAL,
	username varchar(50) NOT NULL UNIQUE,
	password_hash varchar(200) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE campaign (
	campaign_id SERIAL,
	name varchar(100) NOT NULL,
	description text,
	category varchar(50) NOT NULL,
	goal_amount decimal(10, 2) NOT NULL,
	raised_amount decimal(10, 2) DEFAULT 0.00,
	start_date date NOT NULL,
	end_date date NOT NULL,
	CONSTRAINT PK_campaign PRIMARY KEY (campaign_id)
);

CREATE TABLE user_campaign (
	user_id INT NOT NULL,
	campaign_id INT NOT NULL,
	CONSTRAINT PK_user_campaign PRIMARY KEY (user_id, campaign_id)
);

CREATE TABLE donation (
    donation_id SERIAL,
    campaign_id INT NOT NULL,
    user_id INT, 
    amount DECIMAL(10, 2) NOT NULL,
    donation_date date NOT NULL,
    first_name VARCHAR(100),
	last_name VARCHAR(100),
    donor_email VARCHAR(100), 
	CONSTRAINT PK_donation PRIMARY KEY (donation_id),
    CONSTRAINT FK_donation_campaign FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id),
    CONSTRAINT FK_donation_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

ALTER TABLE user_campaign ADD CONSTRAINT FK_user_campaign_user FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE user_campaign ADD CONSTRAINT FK_user_campaign_campaign FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id);

COMMIT TRANSACTION;
