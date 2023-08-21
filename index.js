import express, { Router } from 'express';
import { dbConnect } from './dbconnect.js';
import userRoutes from './user/user.route.js'
 
const app=express();

// to make express understand json
app.use(express.json());

// database connection
dbConnect();

// route register
app.use(userRoutes);



const port=process.env.API_PORT;

app.listen(port,()=>{
    console.log(`App is running in port ${port}`);
})

