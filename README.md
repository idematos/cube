# Cube
A React application and .NET server for managing product transactions.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Running
To run the app, you will need to have Docker installed. From the root of the project, execute
```
docker compose -f docker/docker-compose.yml up
```

You can then go to `http://localhost:8080/` to view it in the browser.

You can also go to `http://localhost:8080/swagger` to read the documentation on the server API.

## Unit tests

Unit tests are automatically ran when the Docker images are being built. 

If you wish to run them separately, you will need .NET installed in your machine. Then, from the root of the project, just run
```
cd server && dotnet test
```
