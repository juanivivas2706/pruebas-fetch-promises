require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});