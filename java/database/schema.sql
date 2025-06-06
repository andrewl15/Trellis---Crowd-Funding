BEGIN TRANSACTION;

DROP TABLE IF EXISTS USERS CASCADE;
DROP TABLE IF EXISTS USER_PAYMENT CASCADE; 
DROP TABLE IF EXISTS CAMPAIGN CASCADE;
DROP TABLE IF EXISTS USER_CAMPAIGN;

CREATE TABLE users (
	user_id SERIAL,
	payment_id INT,  
	username varchar(50) NOT NULL UNIQUE,
	password_hash varchar(200) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);
CREATE TABLE user_payment (
	payment_id SERIAL,
	user_id INT NOT NULL,
	card_number varchar(20),
	expiration_date date,
	street_address varchar(100),
	city_address varchar(100),
	CONSTRAINT PK_user_payment PRIMARY KEY (payment_id)
);	

CREATE TABLE campaign (
	campaign_id SERIAL,
	name varchar(100) NOT NULL,
	description text,
	start_date date NOT NULL,
	end_date date NOT NULL,
	CONSTRAINT PK_campaign PRIMARY KEY (campaign_id)
);
CREATE TABLE user_campaign (
	user_id INT NOT NULL,
	campaign_id INT NOT NULL,
	CONSTRAINT PK_user_campaign PRIMARY KEY (user_id, campaign_id)
);

ALTER TABLE users ADD CONSTRAINT FK_user_payment FOREIGN KEY (payment_id) REFERENCES user_payment(payment_id);
ALTER TABLE user_payment ADD CONSTRAINT FK_user_payment FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE user_campaign ADD CONSTRAINT FK_user_campaign_user FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE user_campaign ADD CONSTRAINT FK_user_campaign_campaign FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id);

COMMIT TRANSACTION;
