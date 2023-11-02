# Travel log

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- Docker: [Docker Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose (usually included with Docker on most platforms): [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

## Getting Started

1. **Edit the docker-compose.yml File**: Open the `docker-compose.yml` file in a text editor and adjust the configuration as needed. You can define environment variables, volumes, network settings, and more in this file.

2. **Start the Application**: Run the following command to start the application using Docker Compose:

   ```bash
   docker-compose up -d
   ```

   The `-d` flag detaches the containers, running them in the background.

3. **Access the Application**: Open a web browser and go to `http://localhost:3000` (or the port you specified in the `docker-compose.yml` file) to access your application.

## Cleanup

To stop and remove the containers, use the following commands:

```bash
docker stop travel-log
docker rm travel-log
```

Or if using Docker Compose:

```bash
docker-compose down
```

## Ngrok

- [Ngrok documentation](https://ngrok.com/docs/getting-started/)

**Configuration**: In order to use ngrok fetaures, you need to follow these steps.

1. Create an account

2. Copy authtoken

3. Replace `READ_README` value with this copied authtoken
