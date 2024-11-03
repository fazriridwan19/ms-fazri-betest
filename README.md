# Application Overview

This application is built using **Node.js** and **Express.js**, providing a robust and scalable backend for web applications. Documentation related to the use of API can be accessed [here](./docs/user.md)

```sql
        +---------------------+
        |      Client         |
        +---------------------+
                |
                |
        +---------------------+
        |  Node.js + Express  |
        |       Service       |
        +---------------------+
                |
                |
        +---------------------+     +---------------------+
        |      MongoDB       |     |        Redis        |
        |   (Data Storage)   |     | (In-Memory Cache)   |
        +---------------------+     +---------------------+

```

## Key Features

- **Node.js**: Utilizes Node.js for its event-driven, non-blocking I/O model, allowing for efficient handling of concurrent requests.
- **Express.js**: Leverages Express.js, a minimal and flexible Node.js web application framework, to create powerful APIs and manage routes easily.

- **MongoDB**: Integrates with MongoDB, a NoSQL database, to store and manage data in a flexible and scalable manner. This enables efficient querying and retrieval of data in JSON-like formats.

- **Redis**: Incorporates Redis as an in-memory data structure store, which is used for caching and improving application performance by reducing latency for frequently accessed data.

## How to Run the Application via Docker Image

Make sure you have installed docker on your system. To run this application using docker image, follow these steps:

1. **Install Docker**

   Ensure you have Docker installed on your machine. If you haven't installed it yet, you can download and install Docker from [Docker's official website](https://www.docker.com/get-started).

2. **Pull the Docker Image**

   Open your terminal and run the following command to pull the latest Docker image:

   ```bash
   docker pull fazriridwan/ms-fazri-betest:latest
   ```

3. **Set Up Environment Variables**

   Create a .env file in the root of your project. You can use the .env.example file as a reference.

4. **Run the Docker Container**

   Once you have the image pulled and the environment file set up, you can run the Docker container using the following command:

   ```bash
   docker run -d --name container-name -p 8080:8080 --env-file .env fazriridwan/ms-fazri-betest:latest
   ```

   This command will:

   - Run the container in detached mode (-d).
   - Name the container container-name.
   - Map port 8080 on your host to port 8080 in the container.
   - Use the environment variables specified in your .env file.

5. **Access the Application**

   Open your postman and navigate to http://localhost:3000 (or the port specified in your application) to see your application in action.

## How to Run the Application Locally

To run this application locally, follow these steps:

1. **Clone the Repository**

   Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/fazriridwan19/ms-fazri-betest.git
   cd ms-fazri-betest
   ```

2. **Install dependency**

   Navigate to the project directory and install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a .env file in the root of your project. You can use the .env.example file as a reference.

4. **Start the Application**

   You can now start the application using the following command:

   ```bash
   npm start
   ```

   This command runs the application in production mode. If you want to run it in development mode (with auto-reload), use:

   ```bash
   npm run dev
   ```

5. **Access the Application**

   Open your postman and navigate to http://localhost:3000 (or the port specified in your application) to see your application in action.
