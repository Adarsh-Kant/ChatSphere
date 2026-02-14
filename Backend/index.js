import express from 'express'
import dotenv from 'dotenv' 
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import userRoute from './route/user_route.js'
import messageRoute from './route/message_route.js'
import { app, server } from './SocketIO/server.js'

dotenv.config()

app.use(express.json())


app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5002"],
    credentials: true
}));


app.use(cookieParser())

const PORT=process.env.PORT || 5002
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI)
    console.log('Connected to MongoDB')
}catch (error) {
  console.log(error)
}

app.use("/user", userRoute);
app.use("/message", messageRoute);
//code for deployment
if(process.env.NODE_ENV === 'production'){
  const dirPath=path.resolve();
  app.use(express.static("./Frontend/dist"));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(dirPath,'./Frontend/dist','index.html'));
  });
}
server.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`)
})