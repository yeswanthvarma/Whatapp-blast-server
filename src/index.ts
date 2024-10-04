import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Contacts from "./routes/Contacts"; 
import Campaigns from "./routes/Campagins"

const app = express();
app.use(cors());
app.use(express.json());
/*------------------------------ Connect to MongoDB --------------------------------*/ 
mongoose.connect("mongodb+srv://yeswanthkallapalli:yesVarma%40789@cluster0.1pfg7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
/*------------------------------ Routes --------------------------------*/
app.use("/contacts", Contacts);
app.use("/campagins", Campaigns);
/*------------------------------ Server Starting --------------------------------*/
app.listen(3002, () => {
  console.log("Express server is running on port 3002");
});
