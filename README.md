# Summary
This API gives a list of customers in the Cloud Datastore DB. 
The usage is:
* getCustomers(): Displays all customers
* getCustomers(id): Filters the customer list with ID matching in the datastore
* addCustomers(id, name, email, age): Adds a new customer to the db
* deleteCustomers(id): deletes the specific customer
* Oauth is used for authenticating the user if any user login is planned further


End points for the result on localhost
Display all customers
http://localhost:8080/oauth2callback/

Display with customer id filter
http://localhost:8080/oauth2callback/id####

## Infrastructure
GCP App Engine + Google Datastore

## Coding Language: 
Javascript with NodeJS + express

## Flow of data:
Datastore is not poplulated with data, The function addCustomer(id, name, email, age) lets to add user in the db

## Configuration:
First step is to modify config.js with the credentials of user

