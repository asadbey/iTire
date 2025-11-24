
# iTire Landing Page Design

This is a code bundle for iTire Landing Page Design.

## Running the code

### Development

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

### Docker

#### Build the Docker image

```bash
docker build -t itire-landing-page .
```

#### Run the Docker container

```bash
docker run -d -p 8080:80 itire-landing-page
```

The application will be available at `http://localhost:8080`

#### Stop the container

```bash
docker ps  # Find the container ID
docker stop <container-id>
```
