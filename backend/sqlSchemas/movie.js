const query = 
    `
      CREATE TABLE ?? (
        title VARCHAR(255) PRIMARY KEY NOT NULL,
        description TEXT NOT NULL,
        release_date DATE NOT NULL,
        rating INT DEFAULT 0,
        user_id CHAR(36) NOT NULL,
        image_url VARCHAR(255),
        video_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES User(id),
        INDEX idx_release_date (release_date),
        INDEX idx_user_id (user_id)
      );
    `;

export default query