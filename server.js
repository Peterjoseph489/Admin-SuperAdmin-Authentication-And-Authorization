require('./config/configDB')
PORT = process.env.PORT


const app = require('./app')

app.listen(PORT, ()=>{
    console.log('listening on port '+PORT)
})

