const express = require("express");
const axios = require("axios");
const app = express();
const port = 9090;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Sample route rendering HTML
app.get("/sample", (req, res) => {
    res.render("sample");
});

// External API route rendering HTML
app.get("/html", async (req, res) => {
    try {
        const response = await axios.get("https://dummy.restapiexample.com/api/v1/employees");

        // Filter the employees to get only the one with ID 2
        const employeeWithId2 = response.data.data.find(employee => employee.id === 2);

        if (employeeWithId2) {
            // Render the 'external-api' view and pass the filtered employee data to it
            res.render("externalApi", { employee: employeeWithId2 });
        } else {
            res.status(404).send("Employee with ID 2 not found");
        }
    } catch (error) {
        // Handle errors
        console.error("Error making external API request:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Serve static CSS files
app.use(express.static("public"));

// Port calling
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
