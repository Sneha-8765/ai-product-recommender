const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/recommend", async (req, res) => {
  try {
    const { query, products } = req.body;

    const lowerQuery = query.toLowerCase();

    let filteredProducts = [...products];

    // Detect category
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

    // Detect budget
    const budgetMatch = lowerQuery.match(/\d+/);

    if (budgetMatch) {
      const budget = Number(budgetMatch[0]);

      filteredProducts = filteredProducts.filter(
        (p) => p.price <= budget
      );
    }

    res.json({
      recommendations: filteredProducts,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});