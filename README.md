# Full Stack MERN Application.

Message Board App


## Front-end setup

Once you've cloned from the github repository, you should be able to get the front-end running by running the following from that directory:

```
cd chatmessenger
npm i
npm start
npm test
```

## Back-end setup
For the back-end, run the following from the root directory of the cloned code:
```
cd server
yarn install
yarn dev
```

#### Database
The MongoDB database should be running on localhost port 27017. It should be called mern_assignment and should have two collections:
- post
- user-data


### Using the app
Navigate to one of the following links when you first start the app:
- localhost:3000/register
- localhost:3000/login
- localhost:3000/dashboard (to see as a user who is not logged in)
