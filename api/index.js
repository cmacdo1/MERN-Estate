import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

/* CONFIGURATIONS */
dotenv.config();
const app = express();


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
    .connect(MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Listening on Port: ${PORT}`));
        console.log('MongoDB Connection Successful')
    })
    .catch((error) => console.log(`${error} did not connect`));

/* ROUTES */