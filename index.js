const express = require('express');
const connectMongo = require('./config/db');

const app = express();

connectMongo();

app.use(express.json({extended: false}));

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Listening in port', PORT));

