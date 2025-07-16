// Ye already honi chahiye
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

// ✅ API route for news
app.get("/api/news", async (req, res) => {
  const category = req.query.category || "general";
  const pageSize = req.query.pageSize || 9;
  const page = req.query.page || 1;

  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: "us",
        category: category,
        apiKey: process.env.NEWS_API_KEY, // ✅ ye apne .env me daal
        pageSize: pageSize,
        page: page
      }
    });

    // Send the exact data back to frontend
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching news from API:", err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
