let express = require('express')

let mongoose  = require('mongoose');
let cors = require('cors')

const Upload = require('./Upload');


mongoose.connect('mongodb://127.0.0.1:27017/insta').then(() => {
    console.log("db.....");
    
})

let app = express()

app.use(express.json())

app.use(cors())

app.get('/',(res,req) => {
    res.send("hello")
})

app.post('/upload', async(req,res) => {

    let {imgUrl} =req.body

    if(!imgUrl){
        return res.send("url not found")
    }

    let uploadD= new Upload({
        imgUrl
    })
    await uploadD.save()
    return res.send("url uploaded")
})

app.listen(4000,() => {

    console.log("server is running on port no. 4000");
    
})