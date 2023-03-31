const express = require('express');
const bodyParser = require('body-parser');
const taxRateRoutes = require('./routesAndControllers/taxRatesApi');
const branchesRoutes = require('./routesAndControllers/salesBranchesApi');
const operationsRoutes = require('./routesAndControllers/operationsApi');
const clientsRoutes = require('./routesAndControllers/clientsApi');
const app = express();

app.use((req,res,next)=>{
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','POST, GET, PATCH, DELETE, OPTIONS');
   res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
   next();
});

app.use('/api', bodyParser.json());
app.use('/api', taxRateRoutes);
app.use('/api', branchesRoutes);
app.use('/api', operationsRoutes);
app.use('/api', clientsRoutes);

app.use((err,req,res,next)=>{
    console.log(err);
});

app.listen(4580);
