const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.post("/recommend", async (req, res) => {
  try {
    const { query, products } = req.body;

    const lowerQuery = query.toLowerCase();

    let filteredProducts = [...products];

    // Category filter
    if (lowerQuery.includes("phone")) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === "phone"
      );
    }

    if (lowerQuery.includes("laptop")) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === "laptop"
      );
    }

    // Budget filter
    const budgetMatch = lowerQuery.match(/\d+/);

    if (budgetMatch) {
      const budget = Number(budgetMatch[0]);

      filteredProducts = filteredProducts.filter(
        (p) => p.price <= budget
      );
    }

    // Add recommendation reason
    const recommendations = filteredProducts.map((p) => ({
      ...p,
      reason: `Matches your search preference`,
    }));

    res.json({
      recommendations,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});