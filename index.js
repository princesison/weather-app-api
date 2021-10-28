require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());

// Static
app.use(express.static("public"));

// Routes
app.use("/weather", require("./routes"));

app.listen(PORT, console.log(`Server running on port ${PORT}`));
