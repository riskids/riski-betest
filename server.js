const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const db = require("./src/models");
db.mongoose
  .connect(db.url, {
    ssl: true, // Enable SSL
    tls: true, // Enable TLS
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const userRoutes = require('./src/routes/userRoutes');
app.use('/api', userRoutes);
