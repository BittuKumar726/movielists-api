## Description

This is a backend application built using Node.js, Express.js, Multer, JWT for authentication, Mongoose for MongoDB interactions, Cloudinary for image storage, and CORS for cross-origin resource sharing.

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository_url>
    cd <repository_directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=""
    CORS_ORIGIN=""
    ACCESS_TOKEN_SECRET=""
    ACCESS_TOKEN_EXPIRY=""
    REFRESH_TOKEN_SECRET=""
    REFRESH_TOKEN_EXPIRY=""
    CLOUDINARY_CLOUD_NAME=""
    CLOUDINARY_API_KEY=""
    CLOUDINARY_API_SECRET_KEY=""
    MONGODB_URI=""
    ```

4. Set up your MongoDB database and update the `MONGODB_URI` in the `.env` file with your MongoDB connection string.

5. Configure Cloudinary for image storage and update the Cloudinary-related environment variables in the `.env` file.

## Usage

1. To start the development server:
    ```sh
    npm run dev
    # or
    yarn run dev
    ```

The server will start and listen on the port specified in the `.env` file.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for Node.js.
- **Multer**: Middleware for handling multipart/form-data, primarily used for uploading files.
- **JWT**: JSON Web Token for authentication.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **MongoDB**: NoSQL database.
- **Cloudinary**: Cloud service for image and video management.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

## Environment Variables

Ensure you have the following environment variables set in your `.env` file:

- `PORT`: The port number on which the server will run.
- `CORS_ORIGIN`: The origin(s) that are allowed to access the server.
- `ACCESS_TOKEN_SECRET`: Secret key for signing access tokens.
- `ACCESS_TOKEN_EXPIRY`: Expiry time for access tokens.
- `REFRESH_TOKEN_SECRET`: Secret key for signing refresh tokens.
- `REFRESH_TOKEN_EXPIRY`: Expiry time for refresh tokens.
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Your Cloudinary API key.
- `CLOUDINARY_API_SECRET_KEY`: Your Cloudinary API secret key.
- `MONGODB_URI`: Connection string for your MongoDB database.

## Important Notes

- Ensure MongoDB is running before starting the server.
- Replace placeholder values in the `.env` file with your actual configuration.

