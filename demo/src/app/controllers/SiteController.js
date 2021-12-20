const UserModels = require('../models/sequelize/user');
const userActivityModels = require('../models/mongoose/userActivity')

class SiteController {

    //[GET] 
    index(req, res, next) {
        UserModels.findAll({ raw: true })
            .then((listUser) => {
                res.json(listUser);
            })
            .catch(next);
    }

    //[POST] /store
    store(req, res, next) {
        UserModels.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password
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
                    const userA = userActivityModels({
                        idUser: user.id,
                    })
                    userA.save({})
                        .then(() => res.json(user))
                        .catch(next);
                }else{
                    res.render('back', { title: 'login', message: 'err' })
                }
            })
            .catch(next);
    }
}

module.exports = new SiteController();