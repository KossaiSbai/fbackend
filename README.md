# Faved Backend

This repository contains the backend code for the submission evaluator application.

## Installation
To get started with the backend, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/fbackend.git
    ```

2. Navigate to the project directory:
    ```bash
    cd fbackend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    Create a `.env` file in the root directory and add the necessary environment variables.
    ```properties
    OPENAI_API_KEY=your_openai_api_key
    YOUTUBE_API_KEY=your_youtube_api_key
    DB_USER=your_database_user
    DB_HOST=your_database_host
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    DB_PORT=your_database_port
    ```

5. Run the application:
    ```bash
    npm start
    ```

---

## Database Setup

The backend uses **PostgreSQL** as the database. Below are the instructions to set up the database schema and insert sample data.

### 1. Create the Database
Login to your PostgreSQL server and create a new database:
```sql
CREATE DATABASE submissions_db;
```

### 2. Schema Setup
Run the following SQL script to set up the required schema:

```sql
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE briefs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    brand_id INTEGER REFERENCES brands(id)
);

CREATE TABLE influencers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    influencer_id INTEGER REFERENCES influencers(id),
    brief_id INTEGER REFERENCES briefs(id),
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    brand_id INTEGER REFERENCES brands(id),
    feedback TEXT
);
```

### 3. Insert Sample Data
Insert sample records into the database:

```sql
INSERT INTO brands (name, description) VALUES 
('Brand A', 'A brand focused on creativity and collaboration.'),
('Brand B', 'A brand that promotes productivity tools.');

INSERT INTO briefs (name, content, brand_id) VALUES 
('Visual Creator Brief', 'Create a video showcasing how Milanote helps organize creative projects.', 1),
('Game Design Brief', 'Showcase the game design process using Milanote as a planning tool.', 2);

INSERT INTO influencers (name) VALUES 
('Sarah'), 
('Michael'), 
('Trond');

INSERT INTO submissions (influencer_id, brief_id, text, status, brand_id, feedback) VALUES 
(1, 1, 'Draft script for Visual Creator Brief', 'pending', 1, NULL),
(2, 2, 'Game design video topic submission', 'pending', 2, NULL),
(3, 1, 'Draft script for photography planning with Milanote', 'pending', 1, 'Good progress but needs more details.');
```

---

## Connecting the Backend to PostgreSQL
1. Ensure your `.env` file contains the correct database connection details:
    ```properties
    DB_USER=postgres
    DB_HOST=localhost
    DB_PASSWORD=your_password
    DB_NAME=submissions_db
    DB_PORT=5432
    ```

2. Verify the database connection:
   The application will automatically connect to the database using the environment variables provided.

---

## API Routes

### Briefs
- `GET /api/briefs`: Fetch all briefs.
- `GET /api/briefs/:id`: Fetch a specific brief by ID.
- `POST /api/briefs`: Create a new brief.

### Submissions
- `GET /api/submissions`: Fetch all submissions.
- `GET /api/submissions/:id`: Fetch a specific submission by ID.
- `POST /api/submissions`: Create a new submission.

### Influencers
- `GET /api/influencers`: Fetch all influencers.
- `GET /api/influencers/:id`: Fetch a specific influencer by ID.

### Evaluate
- `POST /api/evaluate`: Evaluate a submission based on the provided brief and submission content.
