# Welcome
This project is intended to serve as a barebones starter kit for exploring GraphQL using a front-end client written in React and a back-end server using Express, GraphQL, and MongoDB.

# Getting started
The easiest way to use this repo is to have [Docker](https://www.docker.com) installed and configured on your development machine. 

Before starting this project, you will need to update the following `sample.env` file(s) with your own settings and save them as `.env` in their respective directories:
+ `server/sample.env` -> `server/.env`

Once this is complete, you can spin up the project by running:

    $ npm start

This will create the following Docker containers:
+ `graphql-app` - A simple [React](https://reactjs.org) web application to work with our GraphQL API
+ `graphql-server` - The [GraphQL](https://graphql.org) server powered by [Express](https://expressjs.com)
    - NOTE: This is an example for educational purposes and should be hardened before deploying to production.
+ `graphql-mongodb` - A [MongoDB](https://www.mongodb.com) server
    - By default, no database data is stored. If you would like to have this project retain data, uncomment the following two lines in the `./docker-compose.yml` file:
    ```sh
    # volumes:
    #   - ./server/.docker/mongodb/data/db:/data/db
    ```

Assuming you are using the default configuration, you should be able to explore the [GraphQL playground](http://localhost:4000/graphql) by visiting [http://localhost:4000/graphql](http://localhost:4000/graphql) to verify the GraphQL API is running.

Assuming you are using the default configuration, you should be able to see a response from [http://localhost:3000](http://localhost:3000) to verify the front-end web application is running.

Once you have finished with your work - or if you would like to stop the project from running:

    $ npm run docker:down
