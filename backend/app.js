const Express = require('Express');
const app = Express();
const connectDB = require('./db');

// Specify ports for webserver and MongoDB
const PORT = 3000;
const MONGO_PORT = 27017;

// Connect to MongoDB on the specified port
connectDB(MONGO_PORT);

// Body parser
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/createURL'));

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
