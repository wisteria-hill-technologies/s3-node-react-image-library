# POC Image library with S3, node/express, and React

Example of A Basic Image library integrating S3, node/express, and React

### Why?
- I need this so that I do not have to save many images as base64 strings in my database.
- With this, the front end does not have to make api calls to display every image.
- This is a proof of concept/MVP to test so that I can extend this and make a better image library for my other projects.

### What does this do?
- User can upload a file from the front-end (react app) to the back-end server (nodejs/express), which then saves it to aws S3 bucket.
- The app displays all the items (by img tags with s3 urls) in the UI - these urls come from a specified S3 bucket via the back-end server.  The backend passes only urls (not actual image data) via its api to the front-end.

### How to spin
1. pull repo
2. yarn
3. add .env (see .env.example) with s3 credentials.
4. yarn run dev to run both the react app and the server.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
