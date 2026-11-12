const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const rutas = require('./routes');
const openApiSpec = require('./docs/openapi');
const { noEncontrado, manejarErrores } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ estado: 'ok', hora: new Date().toISOString() }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use('/api/v1', rutas);

app.use(noEncontrado);
app.use(manejarErrores);

module.exports = app;
