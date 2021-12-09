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