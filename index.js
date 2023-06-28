const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer=require('multer');

const db=require('./db/db');
const postRoutes=require('./routes/postroutes');
const loginRoutes=require('./routes/loginroutes');

const app=express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
db();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use('/api/post',upload.single('formfile'),postRoutes);
app.use('/api/login',loginRoutes);
const port=process.env.PORT||8000;

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });