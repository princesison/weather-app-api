const url = require("url");
const express = require("express");
const needle = require("needle");
const router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_SECRET = process.env.API_KEY_SECRET;

router.get("/", async (req, res) => {
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_SECRET,
    ...url.parse(req.url, true).query,
  });

  try {
    const response = await needle("get", `${API_BASE_URL}?${params}`);
    res.status(200).json(response.body);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
