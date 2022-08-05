const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(req.query.url)
    console.log(req);
});


const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
