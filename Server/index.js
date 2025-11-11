// File System

// let fs = require('fs')
// fs.writeFileSync('index.txt', "Hello") // Write data in file if it exist or it create a new file and add data
// let data = fs.readFileSync('index.txt') // Read data of file
// console.log(data.toString());
// fs.appendFileSync('index.txt',"Hiii") // Append data in existing data
// fs.unlinkSync('index.txt') // Used to delete file

// Operating System

// let os = require('os')
// console.log(os.arch());
// console.log(os.freemem());
// console.log(os.homedir());
// console.log(os.type());
// console.log(os.hostname());
// console.log(os.cpus());
// console.log(os.platform());
// console.log(os.uptime());
// console.log(os.machine());
// console.log(os.networkInterfaces());
// console.log(os.totalmem());
// console.log(os.userInfo());
// console.log(os.version());
// console.log(os);

// let express = require('express')
// let app = express()

// // Middleware
// app.use('/',(req, res, next)=>{
//     // res.send("Mai nahi jane dunga")
//     // res.send("Chale jao")
//     next()
// })
// app.use('/',(req, res, next)=>{
//     res.send("Mai nahi jane dunga")
//     // next()
// })
// app.get('/',(req,res)=>{
//     res.send("Hello mai hu backend")
// })
// app.get('/home',(req,res)=>{
//     res.send("Hello mai hu backend")
// })
// app.listen(4000,()=>{
//     console.log("Server is running on port 4000");
// })

// 06 november



// let express = require('express')
// let app = express()
// app.use(express.json())
// app.use(express.json())

// app.listen(4000,()=>{
//     console.log("Server is running on port 4000");
// })

// // app.get('/',(req,res)=>{
// //     res.send("Hello mai hu backend")
// // })

// let arr = ["cat", "dog", "cat", "dog"]

// // Path parameter
// // app.get('/:ani',(req,res)=>{
// //     let {ani} = req.params
// //     let data = arr.filter((a)=>{
// //         return a == ani;
// //     })
// //     res.send(data);
// // })

// //let arr1 = ["ankit pal", "ankit", "anand", "anand jain"];
// // app.get('/search', (req, res)=>{
// //     let {firstName, lastName} = req.query
// //     console.log(`firstName: ${firstName} lastName: ${lastName}`);
// //     res.send(`firstName: ${firstName} lastName: ${lastName}`)
// // })

// app.post('/data', (req, res)=>{ 
//     let val = req.body //Its initial value will be undefined. To see the data which we send by using body we have to use app.use(express.json())
//     console.log(val);
//     res.send(val)
// })

// 07 november

let express = require('express')
let mongoose = require('mongoose')

let User = require('./user')
let bcrypt = require('bcrypt')


// npm i mongoose
// npm i bcrypt

let app = express()
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/5thSem").
   then(() => {
      console.log("db conneted...");
   })

app.get('/', (req, res) => {
   res.send("hiii")

})
app.post('/create', async (req, res) => {
   let { userName, email, passWord } = req.body
   console.log(userName, email, "heheh");

   let user = await User.findOne({ email })
   console.log(user, "hiiii");

   if (user) {
      res.send("user jinda haiii")
   }

   let updatedP = await bcrypt.hash(passWord, 10)
   console.log(updatedP, "HEH");

   let userData = new User({
      userName,
      email,
      passWord: updatedP
   })
   await userData.save()
   res.send("account ban gya hai....")
   //   console.log(userName,email, passWord);
})

app.listen(4000, () => {
   console.log("server running on port no 7000");

})


// Commands:
// npm init
// nom i express
// npm i -g nodemon
// npx nodemon start