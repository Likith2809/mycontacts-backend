const express = require("express");
const connectDB = require("./config/dbconnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv=require(`dotenv`).config();

const app = express();
const port = process.env.PORT || 8080;

connectDB();

// enables the data parsing to JSON
app.use(express.json());

// Add Middleware's errorHandler to the application
app.use(errorHandler);

//configure the routing in the app
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/user",require("./routes/userRoutes"));
 
//App starts listining the port here (Connection happens here)
app.listen(port,()=>{
    console.log(`Server running on port:${port}`);
})