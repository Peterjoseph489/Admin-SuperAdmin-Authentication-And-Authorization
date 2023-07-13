const express = require('express');
const route = require('./routes/route')
const app = express();

app.use(express.json());
app.use('/api', route)
app.get('/', (req, res)=>{
    res.send('Welcome Message')
})

module.exports = app