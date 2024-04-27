const query = 
    `
      CREATE TABLE ?? (
        id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
        movie_id VARCHAR(255) NOT NULL,
        user_id CHAR(36) NOT NULL,
        rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
        review TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES User(id),
        UNIQUE (movie_id, user_id),
        INDEX idx_movie_title (movie_id),
        INDEX idx_user_id (user_id)
      );
    `;

export default query