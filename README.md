# Movie Web App

This Fully Responsive Movie Web App is built with React and TypeScript frontend and Node.js for the backend. It allows users to sign up, log in, view movies, search for movies, add reviews, and manage movies. The app also utilizes database tables for movies, users, and reviews, with functionalities such as creating, updating, and deleting records.

## Features

- User authentication: Users can sign up and log in to the app.
- View Movies: Users can view all movies on the homepage displayed as cards with their posters.
- Search Movies: Users can search for movies by title.
- Movie Management: Users can create and delete movies.
- Review Management: Users can create, update, and delete reviews for movies.
- Movie Ranking: Movies are ranked according to the number of reviews they have.
- Movie Trailers: You can also watch the movie trailer

## Tech Stack

- Frontend:
  - React
  - TypeScript

- Backend:
  - Node.js

- Database
  - MySQL 
- Database:
  - Database tables for movies, users, and reviews
  - Joining tables for relationships

- Deployment:
  - Docker Compose file included for easy deployment

## Setup Instructions

1. Clone the repository.
2. Navigate to the frontend and backend directories separately and install dependencies.
3. Set up the database according to the schema provided.
4. Run the backend server.
5. Run the frontend server.
6. Access the app in your browser.

## Docker Compose

- Docker Compose file is included for running the app in a Docker containerized environment.
- Simply run `docker-compose up` to start the app.
