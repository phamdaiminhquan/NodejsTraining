const UserModels = require('../models/user');

class SiteController {

    //[GET] 
    index(req, res, next) {
        UserModels.findAll({ raw: true })
            .then((listUser) => {
                res.json(listUser);
            })
            .catch(next);
    }

    //[GET] /create
    create(req, res, next) {
        res.render('index', { title: 'Create user', message: 'Fill in form create user' })
    }

    //[POST] /store
    store(req, res, next) {
        UserModels.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password
        }).then(() => res.render('back')).catch(next);
    }

    //[GET] /deleteform
    deleteform(req, res, next) {
        res.render('delete', { title: 'Create user', message: 'Fill in form create user' })
    }

    //[POST] /delete
    delete(req, res, next) {
        UserModels.destroy({ where: { id: req.body.id } })
            .then(() => res.render('back', { title: 'Delete user', message: 'user is deleted' }))
            .catch(next);
    }

    //[GET] /login
    loginform(req, res, next) {
        res.render('loginform', { title: 'Login', message: 'Fill in password and username' })
    }

    //[POST] /delete
    login(req, res, next) {
        var userName = req.body.userName
        var password = req.body.password

        UserModels.findOne({ where: { userName: userName}})
            .then((user) => {
                if(user.password == password) {
                    res.render('back', { title: 'login', message: 'user is login' })
                }else{
                    res.render('back', { title: 'login', message: 'err' })
                }
            })
            .catch(next);
    }
}

module.exports = new SiteController();