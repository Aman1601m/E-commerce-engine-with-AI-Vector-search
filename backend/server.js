import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());    


// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "High Performance E-commerce Engine is running ",
    });
});


// Start the server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});