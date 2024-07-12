const express = require("express");
const moviesRouter = require("./routes/movies");


const app = express();

app.use(express.json());

app.use(moviesRouter);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});