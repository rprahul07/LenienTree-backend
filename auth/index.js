import bodyParser from "body-parser";
import express from "express"
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
import connectDb from "./db/db.js";


const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('common'))
app.use(cors())

dotenv.config();
connectDb();

app.use("/",authRoutes)

app.get("/",(req,res)=>{
   
    res.status(201).send("hello from auth microserviece")
})




const PORT=5001;
app.listen(PORT,()=>{ console.log(` The app is listening on port ${PORT}`)})