const Express = require('express');
const cors = require('cors');
const connectDB = require('./db');

// Specify ports for webserver and MongoDB
const PORT = 5000;
const MONGO_PORT = 27017;

// Connect to MongoDB on the specified port
connectDB(MONGO_PORT);

const app = Express();

// CORS
app.use(
  cors({
      allowedHeaders: ["Content-Type"], // you can change the headers
      exposedHeaders: ["Content-Type"], // you can change the headers
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: true
  })
)

// Body parser
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/createURL'));

// Listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
