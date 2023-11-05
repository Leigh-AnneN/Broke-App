const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Route Handles for POST / route
app.post('/', async (req, res, next) => {
  try {
    const developers = req.body.developers;

    // Create an array of Axios requests (promises)
    const requests = developers.map(async (username) => {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return response.data;
    });

    // Execute all requests in parallel and wait for all to complete
    const developersInfo = await Promise.all(requests);

    const result = developersInfo.map((data) => ({
      name: data.name,
      bio: data.bio,
    }));

    return res.json(result);
  } catch (err) {
    // Handle errors without ExpressError
    console.error(err);
    res.status(err.status || 500);
    return res.json({
      error: err.message || 'Internal Server Error',
    });
  }
});

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message || 'Internal Server Error',
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
