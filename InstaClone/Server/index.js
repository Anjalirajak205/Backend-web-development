let express = require('express')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./User");

let mongoose  = require('mongoose');
let cors = require('cors')

const Upload = require('./Upload');

const auth = require("./Auth");


mongoose.connect('mongodb://127.0.0.1:27017/insta').then(() => {
    console.log("db.....");
    
})

let app = express()

app.use(express.json())

app.use(cors())

app.get('/',(res,req) => {
    res.send("hello")
})

// ===== SIGNUP ROUTE =====
app.post("/signUp", async (req, res) => {
  try {
    const { name, email, passWord } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(passWord, 10);
    const newUser = new User({ name, email, passWord: hashedPassword });
    await newUser.save();

    res.json({ msg: "Signup successful", user: newUser });
  } catch (err) {
   return  res.status(500).json({ msg: "Error during signup", error: err.message });
  }
});

// ===== LOGIN ROUTE =====
app.post("/login", async (req, res) => {
  try {
    const { email, passWord } = req.body;
    

    const user = await User.findOne({ email });
    console.log(user ,"user");
    if (!user) return res.status(404).json({ msg: "User not found" });

    console.log("Plain Password:", passWord);
console.log("Hashed from DB:", user.passWord);

    const isMatch = await bcrypt.compare(passWord, user.passWord);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

   const token = jwt.sign(
  { _id: user._id, email: user.email, role: user.role || "user" },
  "SECRET123",
  { expiresIn: "1h" }
);


res.json({
  msg: "Login successful",
  token,
  user: { _id: user._id, name: user.name, email: user.email }
});
  } catch (err) {
   return res.status(500).json({ msg: "Error during login", error: err.message });
  }
});


//--Upload
app.post("/upload", auth, async (req, res) => {
  try {
    const { name, ImgUrl, user } = req.body;

    if (!name || !ImgUrl || !user) {
      return res.status(400).json({ msg: "Missing data" });
    }

    const newImage = new Image({
      name,
      ImgUrl,
      user,
      likeCount: 0,
    });

    await newImage.save();

    res.json({ msg: "Image uploaded successfully" });
    console.log(ImgUrl, "url saved");
  } catch (err) {
    console.error("Error during upload:", err.message);
   return res.status(500).json({ msg: "Error during upload", error: err.message });
  }
});


app.get("/upload", async (req, res) => {
  try {
    const images = await Image.find(); 
    res.json(images);
  } catch (err) {
    console.error("Error fetching images:", err.message);
   return res.status(500).json({ msg: "Error fetching images", error: err.message });
  }
});


// app.post('/upload', async(req,res) => {

//     let {imgUrl} =req.body

//     if(!imgUrl){
//         return res.send("url not found")
//     }

//     let uploadD= new Upload({
//         imgUrl
//     })
//     await uploadD.save()
//     return res.send("url uploaded")
// })

app.listen(4000,() => {

    console.log("server is running on port no. 4000");
    
})