### Team Dev Client

Client repository for team dev project.

### Set up

1. Copy the `.env.example` file to a new file named `.env` (NOTE: Make sure to copy the file, don't remove the original .env.example)
2. Make sure the `REACT_APP_API_URL` environment variable in the `.env` file contains the URL of the server app on your machine
3. `npm ci` to install dependencies
4. `npm start` to run the app. The server must also be running on your machine
5. `docker compose up --build` to start up the docker containers for use
6. `docker compose down` to stop running docker

### Project Management

https://github.com/orgs/boolean-uk/projects/10/views/1

### Contributing

- Pull requests should be made from branches following the naming convention: `<username>-<issue_number>-<feature>`, e.g. `vherus-#1-user_registration`
