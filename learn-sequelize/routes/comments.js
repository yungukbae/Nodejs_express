var express = require('express');
const { RequestTimeout } = require('http-errors');
const { resource } = require('../app');
var {User, Comment} = require('../models');
const comment = require('../models/comment');

var router = express.Router();
router.get('/:id', function(req,res,next){
    Comment.findAll({
        include:{
            model:User,
            where: {id: req.params.id },
        },
    })

    .then((comments) => {
        console.log(comments);
        res.json(comments);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });

});

router.post('/', function(req,res,next) {
    Comment.create({
        commenter: req.body.id,
        comment: req.body.comment,
    })
    .then((result) => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
});

router.patch('/:id', function(req,res,next){
    Comment.update({comment: req.body.comment},{where: {id: req.params.id}})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.delete('/:id', function(req,res,next){
    Comment.update({comment: req.body.comment},{where: {id: req.params.id}})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;