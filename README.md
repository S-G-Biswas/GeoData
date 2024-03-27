## Geo-Data 

## Introduction
An website where user can explore and use the geographical data, also user can select their coordinates and save them into their database. 

## Project type 
#### Full stack

## Deployed App
#### Link: https://geomapdata.netlify.app/

## Directory Structure

### GeoData/App
- Client
  - public/
  - src/
    - components/
      - Login
      - Register
      - Map
      - Navbar
    - utils/
      - Fileparser
  - app.js
  - index.js
- Server
  - config/
    - db.js
  - middleware/
    - auth.js 
  - models/
    - user.model.js
    - data.model.js
  - routes/
    - user.routes.js
    - data.routes.js 
  - index.js

  

## Video walkthrough of the project
link: https://drive.google.com/file/d/1mtJHrAMBQDXDumalyKn07a7i2_d3Nm56/view?usp=sharing

## Features
- User can view the world map. 
- User can draw different shapes.
- User can save the coordinates of the shapes  .

## API End-Points
- users/register --> for register new user.
- users/login --> for login existing user.
- data/add --> adding data to database.

## Installation and Getting Started
- npm install
- npm start- for frontend
- node index.js - for backend













