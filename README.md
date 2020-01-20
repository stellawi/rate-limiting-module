# Introduction

This program is implementing a rate-limiting-module which will stop a requester from making too many HTTP requests within a particular period of time

# Instruction to run the application

This program has the following dependencies
- node version `v10.3.0`
- tsc version `3.0.3`
- redis version `Redis server v=5.0.7 sha=00000000:0 malloc=libc bits=64 build=295beb9462eefd91`

Followings are the instructions to run the application
1. Start local redis-server
```
redis-server
```

2. After the redis instance starts, run the following instructions to run the application
```
npm install
npm start
```

3. To run the tests written, run the following command
```
npm test
```

The following application is running in port `3000`. Head over to any of your preferred browser and entered the following
`http://localhost:3000/`. You will then see a welcome page that says `Hello World`

Once the threshold (number of request > 100 or time limit > 1 hr) is reached. The page will display the following message `Rate limit exceeded. Try again in #{n} seconds`. Afterwards,it will then allow the user to try out again.

# Design Decision

This program is using redis as in-memory database to store information about the maximum rate limit and the time the record created. The current configurations are stored under **.env.environment name** which you can refer to.

Once any of the threshold has been reached, the database will then be clear and the counter will start from 0.

# Assumptions made

Once the threshold is reached and display the required error message and return the respective status code. User will then be able to start their request after some required time defined by the developer.

As of now, the requests may make another attempt in 5 seconds.