# spa-comment_frontend

This is frontend part of Single Page Application that implements functionality of writing comments and replying to them with applicating text file or image. Application has its authorization system, pagination and different sort criterias.

## Stack
React.js, Vite, Socket.io, Zustand, Axios, TailwindCSS, Flowbite-React

## Installation and deployment

#### IMPORTANT: make sure your [backend part](https://github.com/trixxterzz/spa-comment-backend) is deployed and functioning, otherwise frontend will not work as expected.

### Variant 1. Manual deployment
#### Tools requirements: NPM, configured for public object reading S3 bucket

1. Run `npm install`.
2. In **.env.devlocal** file replace empty string in `VITE_S3_BUCKET` with your configured for public reading S3 bucket URL.
3. Run `npm start`.

### Variant 2. Docker deployment
#### Tools requirements: Docker, configured for public object reading S3 bucket

1. In **.env.devlocal** file replace empty string in `VITE_S3_BUCKET` with your configured for public reading S3 bucket URL.
2. Run `docker build -t frontend .`
3. Run `docker run -p 5173:5173 frontend`
