const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const path = require('path')
const routes = require('./routes/Authentication');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth' , routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
})
   .then(() => {
    console.log('Connected to MongoDb');
   })
   .catch((error) => {
    console.error('Error connecting to mongodb ', error);
   })

const PORT = 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT} `);
})