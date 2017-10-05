// To enable fs(filesystem), we need to define an initial setup
const fs = require('fs');

// To enable pathname manipulation, we need to define an initial setup
const path = require('path');

let postPath = "posts"
let buildPath = "build"

//HEADER POST [This is the template for Post Page]
let dataPost1 = fs.readFileSync('templates/post_h.html');
var postHeader = dataPost1.toString();

// FOOTER POST [This is the template for Post Page]
let dataPost2 = fs.readFileSync('templates/post_f.html');
var postFooter = dataPost2.toString();

/* 	
We are trying to create an "dynamic" html page respectively
from each of the file in the posts folder, including its content.	*/
fs.readdir(postPath, function callback(err, list){
	if(err){
		console.log('error');
	}

	// list is an array
	// list [ 'post_one.txt', 'post_three.txt', 'post_two.txt' ]

	/*	
	We are making a "for loop" from the array that is produced
	from fs.readdir, named "list", which literally has a list
	of the filename */
	for ( var i = 0; i < list.length; i++){
		let data = fs.readFileSync(`${postPath}/${list[i]}`);
		var post = data.toString();

		let postEachIndex = postHeader + post + postFooter
		let baseFileName = path.basename(`${postPath}/${list[i]}`, '.txt');

		fs.writeFile(`${buildPath}/${baseFileName}.html`, postEachIndex, 'utf8', (err) => {
		  if (err) console.log(err)
		  console.log('File created successfully')
		});
	}
});


// HEADER [This is the template for Header Page]
let data1 = fs.readFileSync('templates/index_h.html');
var indexHeader = data1.toString();
console.log(indexHeader);

// FOOTER [This is the template for Header Page]
let data2 = fs.readFileSync('templates/index_f.html');
var indexFooter = data2.toString();
console.log(indexFooter);

/* 	
We are trying to create an index.html page that contains
a "dynamic" list of links from our posts folder	*/
fs.readdir(postPath, function callback(err, list){
	if(err){
		console.log('error');
	}

	let indexContent = "";

	for (let i = 0; i < list.length; i++){
		let baseFileName = path.basename(`${postPath}/${list[i]}`, '.txt');
		indexContent += "<li>" + "<a href='"+ baseFileName + ".html'>" + baseFileName + "</a></li>";
	};

	function generateIndex(){
		let finalIndexContent = indexHeader + indexContent + indexFooter;
		fs.writeFile('build/index.html', finalIndexContent, 'utf8', (err) => {
		  if (err) console.log(err)
		  console.log('file created')
		});
	}

	generateIndex();

});






// let data = fs.readFileSync('posts/post_one.txt');
// console.log("this is data" + data);
// var postOne = data.toString();
// console.log(postOne);

// postOneIndex = indexHeader + postOne + indexFooter

// console.log(postOneIndex);

// fs.writeFile('build/index.html', postOneIndex, 'utf8', (err) => {
//   if (err) console.log(err)
//   console.log('file created')
// });
