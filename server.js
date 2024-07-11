const express = require("express");
require("dotenv").config();

const app = express();

app.use('/', (req, res) => {
    res.send("Hello world")
})

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});