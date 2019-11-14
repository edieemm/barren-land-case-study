const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Route includes
const productRouter = require('./routers/product.router');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Routes */
app.use('/product', productRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


