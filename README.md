# Elasticsearch PostgreSQL Data Indexer

## Overview

`elasticsearch-postgresql-data-indexer` is a Node.js application that parses data from a PostgreSQL table and indexes it into an Elasticsearch index. This tool is useful for synchronizing data between a PostgreSQL database and Elasticsearch, enabling efficient search capabilities on the data.

## Features

- Parses data from a specified PostgreSQL table
- Indexes data into an Elasticsearch index
- Built with TypeScript for type safety
- Uses Express.js for routing
- Includes a route to trigger the indexing process

## Prerequisites

- Node.js (v14.x or later)
- PostgreSQL database
- Elasticsearch (v7.x or later)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/skanderbenali/elasticsearch-postgresql-data-indexer.git
    cd elasticsearch-postgresql-data-indexer
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create an `app.env` file in the root of the project with the following content:

    ```env
    PORT=3000
    DB_USER=postgres
    DB=database
    DB_PASS=password
    DB_HOST=localhost
    DB_PORT=5432
    DB_MAX_CLIENTS=20
    DB_IDLE_TIMEOUT_MS=30000

    ELK_HOST=https://localhost:9200
    ELK_PORT=9200
    ELK_USERNAME=elastic
    ELK_PASSWORD=password
    ELK_INDEX=indexname
    ELK_CA_FILE_PATH=ca_path
    ```

4. Create a `.env` file in the root of the project with the following content:

    ```env
    ########################################
    #############ELK VARS###################
    ########################################

    # Version of Elastic products
    STACK_VERSION=

    # Set to 'basic' or 'trial' to automatically start the 30-day trial
    LICENSE=

    # Password for the 'elastic' user (at least 6 characters)
    ELASTIC_PASSWORD=

    # Password for the 'kibana_system' user (at least 6 characters)
    KIBANA_PASSWORD=

    # Set the cluster name
    CLUSTER_NAME=

    # Increase or decrease based on the available host memory (in bytes)
    MEM_LIMIT=

    # Log
    ES_LOG_LEVEL=
    ```

## Usage

1. Build the project:

    ```sh
    npm run build
    ```

2. Start the application:

    ```sh
    npm start
    ```

3. Use the `/indexData` route to trigger the indexing process. For example, if you are running the application locally, you can trigger the route using curl or a web browser:

    ```sh
    curl http://localhost:3000/indexData
    ```

## Project Structure

- `src/`: Source code for the application
- `build/`: Compiled JavaScript files
- `package.json`: Project metadata and dependencies
- `app.env`: Application environment configuration
- `.env`: Environment configuration for Elasticsearch stack
- `.gitignore`: Specifies which files and directories to ignore in the repository

## Scripts

- `npm run build`: Compiles the TypeScript code into JavaScript
- `npm run lint`: Runs ESLint to check for code quality issues
- `npm run start`: Lints the code, compiles the TypeScript, and starts the application
- `npm run test`: Runs tests using Jest and outputs a coverage report

## Dependencies

- `@elastic/elasticsearch`: Elasticsearch client for Node.js
- `async`: Utility module for asynchronous programming
- `body-parser`: Middleware for parsing JSON and URL-encoded request bodies
- `compromise`: Natural language processing library
- `dotenv`: Loads environment variables from a .env file
- `express`: Web framework for Node.js
- `ioredis`: Redis client for Node.js
- `pg`: PostgreSQL client for Node.js
- `pg-promise`: Promises-based PostgreSQL client for Node.js
- `winston`: Logging library

## Development Dependencies

- `@types/...`: TypeScript definitions for various modules
- `@typescript-eslint/...`: ESLint plugin and parser for TypeScript
- `eslint`: JavaScript linter
- `jest`: Testing framework
- `prettier`: Code formatter
- `ts-jest`: Jest transformer for TypeScript
- `ts-node`: TypeScript execution environment for Node.js
- `typescript`: TypeScript compiler

## License

This project is licensed under the SkanderBenali License.

## Author

Skander Benali
