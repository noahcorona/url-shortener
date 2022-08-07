const Express = require('express');
const cors = require('cors');
const app = Express();
const connectDB = require('./db');

// Specify ports for webserver and MongoDB
const PORT = 5000;
const MONGO_PORT = 27017;

// Connect to MongoDB on the specified port
connectDB(MONGO_PORT);

// CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

// Body parser
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/createURL'));

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
