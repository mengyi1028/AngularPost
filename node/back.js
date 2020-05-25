const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const Post = require('./models/post');

mongoose.connect("mongodb+srv://post:2020@cluster0-hh0tz.mongodb.net/test?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useCreateIndex: true,
	 useUnifiedTopology: true
}).then(()=>{
	console.log('connected to db!');
}).catch(err =>{
	console.log("Not connected to db!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers',"Origin, Content-Type, Accept");
	res.setHeader(
	'Access-Control-Allow-Methods',
	'FET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});


app.get('/api/posts',(req, res, next) =>{
	Post.find().then(documents => {
		res.status(200).json({
		message:"Fetched successfully!",
		posts: documents
	});
	});
	
});

app.post('/api/posts', (req, res, next)=>{
	const post = new Post({
		title: req.body.title,
		content: req.body.content
	});
	post.save().then(createPost => {
		
		//console.log(post);
		res.status(201).json({
		message: 'Post added successfully!',
		postId: createPost._id
	});
	});
	
	
	
});

app.delete('/api/posts/:id',(req, res, next) => {
	Post.deleteOne({_id: req.params.id}).then(result => {
		//console.log(result);
		res.status(200).json({message: 'post deleted!'});
	});	
});

module.exports = app;
