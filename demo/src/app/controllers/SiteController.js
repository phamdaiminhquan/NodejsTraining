const UserModels = require('../models/sequelize/user');
const nodemailer = require('nodemailer');
const userActivityModels = require('../models/mongoose/userActivity')
const jwt = require('jsonwebtoken')

// Hàm ghi tài khoản mật khẩu gửi đi
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dh51704012@student.stu.edu.vn',
        pass: 'Heimerdinger123'
    }
});
// Hàm viết mail
const mailOptions = (to, sub, text) => {
    return {
        from: 'dh51704012@student.stu.edu.vn',
        to: to,
        subject: sub,
        text: text,
    }
};
//nội dung và chủ đề
var subject = 'Đăng ký tài khoản demoTMA thành công !'
var text = 'Chúc mừng bạn đã đăng ký tài khoàn thành công'

// hàm tạo token
const maxAge = 3*24*60*60
const createToken = (userName) =>{
    return jwt.sign({userName}, 'next user secret', {expiresIn: '30s'})
}


class SiteController {

    //[GET] 
    index(req, res, next) {
        UserModels.findAll({ raw: true })
            .then((listUser) => {
                res.json(listUser);
            })
            .catch(next);
    }

    //[GET] /me
    me(req, res, next) {
        UserModels.findOne({ where: { userName: req.body.userName}})
            .then((user) => {
                res.json(user);
            })
            .catch(next);
    }

    //[POST] /store
    store(req, res, next) {
        transporter.sendMail(mailOptions(req.body.email, subject, text), function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        UserModels.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
        })
        .then((user) => res.json(user))
        .catch(next);
    }

    //[POST] /delete
    delete(req, res, next) {
        UserModels.destroy({ where: { id: req.body.id } })
            .then(() => res.redirect('/'))
            .catch(next);
    }

    //[POST] /delete
    login(req, res, next) {
        var userName = req.body.userName
        var password = req.body.password

        UserModels.findOne({ where: { userName: userName}})
            .then((user) => {
                if(user.password == password) {
                    const token = createToken(userName)
                    const userA = userActivityModels({
                        idUser: user.id,
                    })
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
                    userA.save({})
                        .then(() => 
                            
                            res.json({ token })
                        )
                        .catch(next);
                }else{
                    res.render('back')
                }
            })
            .catch(next);
    }
}

module.exports = new SiteController();