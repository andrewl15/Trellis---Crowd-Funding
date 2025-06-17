BEGIN TRANSACTION;

DROP TABLE IF EXISTS POLL_USERS CASCADE;
DROP TABLE IF EXISTS POLL_OPTION CASCADE;
DROP TABLE IF EXISTS POLLS CASCADE;
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

CREATE TABLE polls (
	campaign_id INT NOT NULL,
	poll_id SERIAL,
	poll_name varchar(100),
	CONSTRAINT PK_POLL_ID PRIMARY KEY (poll_id)
);

CREATE TABLE poll_option(
	poll_id INT NOT NULL,
	poll_option_id SERIAL,
	poll_option_title varchar(100),
	CONSTRAINT PK_POLL_OPTION_ID PRIMARY KEY (poll_option_id)
);

CREATE TABLE poll_users (
	poll_users_id SERIAL,
	poll_id INT NOT NULL,
	user_id INT NOT NULL,
	poll_option_id INT NOT NULL,
	CONSTRAINT PK_POLL_USERS_ID PRIMARY KEY (poll_users_id)
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
	CONSTRAINT PK_donation PRIMARY KEY (donation_id),
    CONSTRAINT FK_donation_campaign FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id),
    CONSTRAINT FK_donation_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

ALTER TABLE user_campaign ADD CONSTRAINT FK_user_campaign_user FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE user_campaign ADD CONSTRAINT FK_user_campaign_campaign FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id);
ALTER TABLE polls ADD CONSTRAINT FK_CAMPAIGN_ID FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id);
ALTER TABLE poll_option ADD CONSTRAINT FK_OPTION_POLL_ID FOREIGN KEY (poll_id) REFERENCES polls(poll_id);
ALTER TABLE poll_users ADD CONSTRAINT FK_POLL_USERS_POLL_ID FOREIGN KEY (poll_id) REFERENCES polls(poll_id);
ALTER TABLE poll_users ADD CONSTRAINT FK_POLL_USERS_USER_ID FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE poll_users ADD CONSTRAINT FK_POLL_USERS_POLL_OPTION FOREIGN KEY (poll_option_id) REFERENCES poll_option(poll_option_id);

COMMIT TRANSACTION;
