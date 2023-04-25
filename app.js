const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const rightRoutes = require('./routes/rightRoutes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/rights', rightRoutes);

module.exports = app;

// start the server and listen on port 8082
const server = app.listen(8082, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`App listening on http://${host}:${port}`);
  });