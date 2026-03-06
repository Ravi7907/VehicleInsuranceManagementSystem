const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const customers = require('./routes/customers');
const vehicles  = require('./routes/vehicles');
const policies  = require('./routes/policies');
const claims    = require('./routes/claims');

app.use('/api/customers', customers);
app.use('/api/vehicles',  vehicles);
app.use('/api/policies',  policies);
app.use('/api/claims',    claims);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
