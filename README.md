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
    DB_NAME=your_database_name
    DB_PORT=your_database_port
    ```

5. Run the application:
    ```bash
    npm start
    ```

## Usage
Once the application is running, you can access the API endpoints at `http://localhost:3000/api`.

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