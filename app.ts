import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/route';
import {dbConnect} from './src/config/connection'
import { swaggerDefinition } from './src/swaggerdocs/swaggerdefinition';
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
dotenv.config();

const app = express();

app.use(express.json());

//-------------------------------Swagger---------------------------
const options = {
    swaggerDefinition,
    apis: ['./src/swaggerdocs/*'],
  };
  
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//-----------------------------------------------------------------
dbConnect();

app.use('/', router);


const port=process.env.port || 4001;
app.listen(port,function(){
    console.log(`Server connect at ${port}`);
});