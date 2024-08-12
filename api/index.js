const express= require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const Post = require('./models/Post');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://blog:bGo2vXuKsBmOW8mX@cluster0.iws3w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("Connected to MongoDB")) //Added
.catch(err => console.error("Failed to connect to MongoDB", err)); //Added

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    console.log('Received request:', { username, password }); //Added
    try{
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password,salt) 
        });
        res.json(userDoc);
    } catch(e) {
        console.log("error creating user", e)
        res.status(400).json(e)
    }
  });

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json({ 
            id: userDoc._id,
            username,
          });
        });
      } else {
        res.status(400).json('wrong credentials');
      }
})

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    console.log('Token received:', token);
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) {
        console.error('JWT verification failed:', err);
        return res.status(401).json({ error: "Unauthorized" });
      }
      console.log('Decoded JWT:', info);
      res.json(info);
    });
  });
  

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });

app.post("/post", uploadMiddleware.single('file'), async (req,res) =>{
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
      });
      res.json(postDoc);
    });
});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);

    if (!postDoc) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const isAuthor = postDoc.author.equals(info.id);
    if (!isAuthor) {
      return res.status(403).json({ error: 'You are not the author' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        cover: newPath || postDoc.cover,
      },
      { new: true }
    );

    res.json(updatedPost);
  });
});


app.get('/post', async (req, res) => {
  try {
      console.log('Fetching posts...');
      const posts = await Post.find()
          .populate('author', ['username'])
          .sort({ createdAt: -1 })
          .limit(20);
      console.log('Posts fetched successfully:', posts);
      res.json(posts);
  } catch (err) {
      console.error('Error fetching posts:', err);
      res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const postDoc = await Post.findById(id).populate('author', ['username']);
      if (!postDoc) {
          return res.status(404).json({ error: 'Post not found' });
      }
      res.json(postDoc);
  } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
  }
});



app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

//mongodb+srv://aditionkar03:2XFFHDfVjsfdOKWp@cluster0.yrqa6js.mongodb.net/
//2XFFHDfVjsfdOKWp