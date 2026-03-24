# User Dashboard

A simple full-stack web application to manage user records. The application allows you to add, view, and delete users from a MySQL database. 

## Features
* **View Users:** Fetches and displays a list of all users from the database.
* **Add User:** Allows adding a new user with a name and email address.
* **Delete User:** Remove a user from the system based on their ID.

## Tech Stack
* **Frontend:** HTML, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MySQL (utilizing a `mysql2` connection pool)

## Prerequisites
* Node.js installed on your machine.
* A running MySQL instance (local or hosted like AWS RDS).

## Setup and Installation

### 1. Database Setup
Create a MySQL database and a `users` table with the following schema:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
