var http = require('http');
var fs = require('fs');
var url = require('url');
var adr = 'http://localhost:2412/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

var formidable = require('formidable');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dh51704012@student.stu.edu.vn',
        pass: 'Heimerdinger123'
    }
});

var mailOptions = {
    from: 'dh51704012@student.stu.edu.vn',
    to: 'pdmquan@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.filepath;
            var newpath = 'C:/aaa/' + files.filetoupload.originalFilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    console.log(err);
                }
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);

//create a server object:
http.createServer(function (req, res) {

    fs.readFile('demofile1.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    fs.open('mynewfile2.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });
    fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });
    fs.unlink('mynewfile2.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });
}).listen(2412);