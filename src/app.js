const express = require('express');
const bodyParser = require('body-parser');
const taxRateRoutes = require('./routesAndControllers/taxRatesApi');
const branchesRoutes = require('./routesAndControllers/salesBranchesApi');
const operationsRoutes = require('./routesAndControllers/operationsApi');
const clientsRoutes = require('./routesAndControllers/clientsApi');
const app = express();

app.use('/api', bodyParser.json());
app.use('/api', taxRateRoutes);
app.use('/api', branchesRoutes);
app.use('/api', operationsRoutes);
app.use('/api', clientsRoutes);

app.listen(4580);
