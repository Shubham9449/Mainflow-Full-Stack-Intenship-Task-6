const express = require("express");
const collection = require("./mongo"); // Assuming you have a MongoDB collection module
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// GET route (you might want to return something here)
app.get("/", cors(), (req, res) => {
    res.send("Server is running!"); // Example response
});

// Login route
app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await collection.findOne({ email: email });

        if (check && check.password === password) {
            res.json({ status: "exist" });
        } else {
            res.json({ status: "notexist" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Signup route
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const data = {
        email: email,
        password: password,
    };

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            res.json({ status: "exist" });
        } else {
            await collection.insertMany([data]);
            res.json({ status: "notexist" });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
