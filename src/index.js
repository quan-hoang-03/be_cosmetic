const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config()
const app = express();
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('Hello world everyone')
})
mongoose.connect(`mongodb+srv://quanhoangcnpm1:0988935298@clustercosmetic.gyug2.mongodb.net/`).then(()=>{
    console.log('Connect DB success');
})
.catch((err)=>{
    console.log(err)
})

app.listen(port, () => {
    console.log('Server is running in port: ', +port)
})   