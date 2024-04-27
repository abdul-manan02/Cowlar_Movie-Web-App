CREATE TABLE Review (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    movie_title VARCHAR(255) NOT NULL,
    user_id CHAR(36) NOT NULL,
    rating INT NOT NULL,
    review TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_title) REFERENCES Movie(title) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User(id),
    INDEX idx_movie_title (movie_title),
    INDEX idx_user_id (user_id)
);