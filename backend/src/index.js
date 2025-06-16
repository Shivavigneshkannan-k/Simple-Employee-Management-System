import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import employeeRouter from "./routes/employee.route.js" 

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use('/api/v1',employeeRouter)
app.use('/',(req,res)=>{
  res.send("working");
})

const dbConnection = async () => {
  await mongoose.connect(process.env.DB_URI).then(() => {
    console.log("DB connection established!!")
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch(()=>{
    console.log("DB connection failed!!!")
  });
};
dbConnection();
