const query = 
    `
      CREATE TABLE ?? (
        id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        release_date DATE NOT NULL,
        rating INT DEFAULT 0,
        user_id CHAR(36),
        image_url VARCHAR(255),
        video_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE SET NULL,
        INDEX idx_release_date (release_date),
        INDEX idx_user_id (user_id)
      );
    `;

export default query