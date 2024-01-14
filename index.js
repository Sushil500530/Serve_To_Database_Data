const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;



app.get('/', (req,res)=>{
    res.send('Server is Running Now.....');
})

app.listen(port, ()=>{
    console.log(`Server is Running on port ${port}`);
})
