# Supply and Borrow Trend API - Server Setup

This README provides instructions and documentation for setting up the Supply and Borrow Trend API server on your local machine.

## Table of Contents
- [Server setup](#server-setup)
  - [Clone Repository](#clone-repository)
  - [Install Dependencies](#install-dependencies)
  - [Configure Environment Variables](#configure-environment-variables)
  - [Run the Server](#run-the-server)
- [Supply and Borrow Trend API](#supply-and-borrow-trend-api)
  - [Supply Trend](#supply-trend)
    - [Fetch User Supply Trend](#fetch-user-supply-trend)
    - [Fetch System Supply Trend](#fetch-system-supply-trend)
  - [Collateral Information](#collateral-information)
    - [Get Collateral List of User](#get-collateral-list-of-user)
    - [Get Total Collateral Value of User](#get-total-collateral-value-of-user)
  - [Borrow Information](#borrow-information)
    - [Fetch Total Borrow Value of System](#fetch-total-borrow-value-of-system)
    - [Fetch Total Borrow Value of User](#fetch-total-borrow-value-of-user)
    - [Fetch Borrow List of User](#fetch-borrow-list-of-user)

## Server Setup
### Clone Repository

To get started, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/anilpdl/thegraph-pool.git
```

### Install Dependencies

Navigate to the project directory and install the required dependencies using either npm or yarn. Choose one of the following commands based on your preferred package manager:

#### Using npm

```bash
cd thegraph-pool
npm install
```

#### Using yarn

```bash
cd thegraph-pool
yarn install
```

This will install all the necessary packages and libraries for the API to run successfully.

### Configure Environment Variables

Locate the `.env.sample` file in the project root directory. Rename this file to `.env`. Open the `.env` file and configure the necessary environment variables such as database connection details, API keys, or any other settings required by the application.

```bash
mv .env.sample .env
```

Edit the `.env` file according to your environment and requirements.

### Run the Server

After configuring the environment variables, you can run the server using the following command:

```bash
npm run dev
```

This command starts the server in development mode, and you should see output indicating that the server is running. Open your web browser and go to `http://localhost:4000` to access the API.

Feel free to explore the various API routes as described in the API documentation. If you encounter any issues or have questions, refer to the troubleshooting section in this README or check the project's issue tracker on GitHub.

Congratulations! You have successfully set up and run the Supply and Borrow Trend API server on your local machine.

# Supply and Borrow Trend API

Documentation for the Supply and Borrow Trend API, which allows users to fetch data related to supply and borrow trends in the system.

## Supply Trend

### Fetch User Supply Trend

**GET Route:** `{{baseURL}}/trend/:walletAddress`

**Example Route:** `{{baseURL}}/trend/0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc`

**Response:**
```json
{
  "user": "0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc",
  "supplyData": {
    "groupedData": {
      "34938482": {
        "borrows": [],
        "deposits": [
          {
            "__typename": "Deposit",
            "tokenAmount": "500000000000000000000",
            "user": "0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc",
            "Pool_id": "0x46544d0000000000000000000000000000000000000000000000000000000000",
            "blockNumber": "34938482"
          }
        ],
        "blockTotalBorrow": 0,
        "blockTotalDeposit": 500000000000000000000
      },
      "34938648": {
        "borrows": [
          {
            "__typename": "Borrow",
            "tokenAmount": "50000000000000000000",
            "user": "0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc",
            "Pool_id": "0x46544d0000000000000000000000000000000000000000000000000000000000",
            "blockNumber": "34938648"
          }
        ],
        "deposits": [],
        "blockTotalBorrow": 50000000000000000000,
        "blockTotalDeposit": 0
      }
    },
    "totalDeposit": 500000000000000000000,
    "totalBorrow": 50000000000000000000
  }
}
```

**Description:** Fetch supply trend of a specific user.

### Fetch System Supply Trend

**GET Route:** `{{baseURL}}/trend`

**Response:**
```json
{
  "supplyData": {
    "groupedData": {
      "34938482": {
        "borrows": [],
        "deposits": [
          {
            "__typename": "Deposit",
            "tokenAmount": "500000000000000000000",
            "user": "0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc",
            "Pool_id": "0x46544d0000000000000000000000000000000000000000000000000000000000",
            "blockNumber": "34938482"
          }
        ],
        "blockTotalBorrow": 0,
        "blockTotalDeposit": 500000000000000000000
      },
      "34938648": {
        "borrows": [
          {
            "__typename": "Borrow",
            "tokenAmount": "50000000000000000000",
            "user": "0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc",
            "Pool_id": "0x46544d0000000000000000000000000000000000000000000000000000000000",
            "blockNumber": "34938648"
          }
        ],
        "deposits": [],
        "blockTotalBorrow": 50000000000000000000,
        "blockTotalDeposit": 0
      },
      "35004275": {
        "borrows": [],
        "deposits": [
          {
            "__typename": "Deposit",
            "tokenAmount": "1000000000000000000",
            "user": "0x9f358d16a28f69f451439124bfe9dc934b0a9894",
            "Pool_id": "0x46544d0000000000000000000000000000000000000000000000000000000000",
            "blockNumber": "35004275"
          }
        ],
        "blockTotalBorrow": 0,
        "blockTotalDeposit": 1000000000000000000
      },
      "35149402": {
        "borrows": [],
        "deposits": [
          {
            "__typename": "Deposit",
            "tokenAmount": "1000000000000000000",
            "user": "0x9f358d16a28f69f451439124bfe9dc934b0a9894",
            "Pool_id": "0x46544d0000000000000000000000000000000000000000000000000000000000",
            "blockNumber": "35149402"
          }
        ],
        "blockTotalBorrow": 0,
        "blockTotalDeposit": 1000000000000000000
      }
    },
    "totalDeposit": 502000000000000000000,
    "totalBorrow": 50000000000000000000
  }
}
```

**Description:** Fetch supply trend of the entire system.

## Collateral Information

### Get Collateral List of User

**GET Route:** `{{baseURL}}/collateral/:walletAddress`

**Example Route:** `{{baseURL}}/collateral/0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc`

**Response:**
```json
{
  "deposit": [
    {
      "__typename": "Deposit",
      "tokenAmount": "500000000000000000000",
      "user": "0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc",
      "Pool_id": "0x46544d0000000000000000000000000000000000000000000000000000000000",
      "blockNumber": "34938482"
    }
 

 ]
}
```

**Description:** Get the collateral list of a specific user.

### Get Total Collateral Value of User

**GET Route:** `{{baseURL}}/collateral/:walletAddress/total`

**Example Route:** `{{baseURL}}/collateral/0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc/total`

**Response:**
```json
{
  "total": 500000000000000000000
}
```

**Description:** Get the total collateral value of a specific user.

## Borrow Information

### Fetch Total Borrow Value of System

**GET Route:** `{{baseURL}}/borrow/total`

**Response:**
```json
{
  "total": 50000000000000000000
}
```

**Description:** Fetch the total borrow value in the system.

### Fetch Total Borrow Value of User

**GET Route:** `{{baseURL}}/borrow/:walletAddress/total`

**Example Route:** `{{baseURL}}/borrow/0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dd/total`

**Response:**
```json
{
  "user": "0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dd",
  "total": 0
}
```

**Description:** Fetch the total borrow value of a specific user.

### Fetch Borrow List of User

**GET Route:** `{{baseURL}}/borrow/:walletAddress`

**Example Route:** `{{baseURL}}/borrow/0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc`

**Response:**
```json
{
  "borrows": [
    {
      "__typename": "Borrow",
      "tokenAmount": "50000000000000000000",
      "user": "0x5ba85d71ef9ae0edc180a6bf5e65f0a749f062dc",
      "Pool_id": "0x46544d0000000000000000000000000000000000000000000000000000000000",
      "blockNumber": "34938648"
    }
  ]
}
```

**Description:** Fetch the borrow list of a specific user.