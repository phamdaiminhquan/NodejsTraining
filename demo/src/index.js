const express = require('express');
const route = require('./routes');
const dotenv = require('dotenv');

const dbmongoose = require('./config/db/mongoose');
const dbsequelize = require('./config/db/sequelize');

const app = express();
const port = 3000;

//connect to mongodb
dbmongoose.connect();

//config dotenv
dotenv.config();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

//Routes
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


//send an email
const sendemailtma = require('../node_modules/sendemailtma/index.js')
const transporter = sendemailtma.transporter('gmail', 'dh51704012@student.stu.edu.vn', 'Heimerdinger123')
const mailOptions = sendemailtma.mailOptions('dh51704012@student.stu.edu.vn', 'pdmquan@gmail.com', 'Sending Email using Node.js', 'That was easy!')

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var adr = 'http://localhost:2412/default.htm?year=2017&month=february';
// var q = url.parse(adr, true);
// var formidable = require('formidable');


// app.engine('ntl', function (filePath, options, callback) { // define the template engine
//     fs.readFile(filePath, function (err, content) {
//         if (err) return callback(err)
//         // this is an extremely simple template engine
//         var rendered = content.toString()
//             .replace('#title#', '<title>' + options.title + '</title>')
//             .replace('#message#', '<h1>' + options.message + '</h1>')
//         return callback(null, rendered)
//     })
// })

// app.set('views', './views') // specify the views directory
// app.set('view engine', 'ntl') // register the template engine



// console.log(q.host); //returns 'localhost:8080'
// console.log(q.pathname); //returns '/default.htm'
// console.log(q.search); //returns '?year=2017&month=february'

// var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
// console.log(qdata.month); //returns 'february'

//Upload File
// http.createServer(function (req, res) {
//     if (req.url == '/fileupload') {
//         var form = new formidable.IncomingForm();
//         form.parse(req, function (err, fields, files) {
//             var oldpath = files.filetoupload.filepath;
//             var newpath = 'C:/aaa/' + files.filetoupload.originalFilename;
//             fs.rename(oldpath, newpath, function (err) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 res.write('File uploaded and moved!');
//                 res.end();
//             });
//         });
//     } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//         res.write('<input type="file" name="filetoupload"><br>');
//         res.write('<input type="submit">');
//         res.write('</form>');
//         return res.end();
//     }
// }).listen(8080);

// //create a server object:
// http.createServer(function (req, res) {
//     fs.readFile('demofile1.html', function (err, data) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write(data);
//         return res.end();
//     });
//     fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//     });
//     fs.open('mynewfile2.txt', 'w', function (err, file) {
//         if (err) throw err;
//         console.log('Saved!');
//     });
//     fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
//         if (err) throw err;
//         console.log('Replaced!');
//     });
//     fs.unlink('mynewfile2.txt', function (err) {
//         if (err) throw err;
//         console.log('File deleted!');
//     });
// }).listen(2412);