import express from 'express';

import usersRoutes from "./routes/userRoute.mjs";

import categoriesRoutes  from './routes/categoryRoute.mjs';

import resumeRoutes from './routes/resumeRoute.mjs';

import companyRoutes from './routes/companyRoute.mjs';

import jobRoutes from './routes/jobRoute.mjs';

import applicationRouter from './routes/applicationRoute.mjs';

import contactRoute from './routes/contactRoute.mjs';

import mongoose from 'mongoose';

import cors from 'cors';

mongoose.connect('mongodb://localhost/Job_Portal')
.then(()=> console.log("hellooo hyyyy"))
.catch((err)=>console.log(err));

const app = express();

app.use(cors());

app.use(express.json()); 

app.use(usersRoutes);

app.use(categoriesRoutes);

app.use(resumeRoutes);

app.use(companyRoutes);

app.use(jobRoutes);

app.use(applicationRouter);

app.use(contactRoute);

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(PORT);
});