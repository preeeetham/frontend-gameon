const express = require('express');
const apiRouter = require('./routes/apiRoute.js');
const app = express();
const PORT = 4000;

app.use('/api',apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });