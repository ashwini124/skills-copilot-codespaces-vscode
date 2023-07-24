// Create web server
// By:   Slavko Vojnovic

// Import modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comments = require('../models/comments');

// Create router
var commentRouter = express.Router();

// Configure router to use body-parser
commentRouter.use(bodyParser.json());

// Configure router to use route without id
commentRouter.route('/')
// Get all comments
.get(function (req, res, next) {
    Comments.find({}, function (err, comment) {
        if (err) throw err;
        res.json(comment);
    });
})
// Post new comment
.post(function (req, res, next) {
    Comments.create(req.body, function (err, comment) {
        if (err) throw err;
        console.log('Comment created!');
        var id = comment._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the comment with id: ' + id);
    });
})
// Delete all comments
.delete(function (req, res, next) {
    Comments.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

// Configure router to use route with id
commentRouter.route('/:commentId')
// Get comment with id
.get(function (req, res, next) {
    Comments.findById(req.params.commentId, function (err, comment) {
        if (err) throw err;
        res.json(comment);
    });
})
// Update comment with id
.put(function (req, res, next) {
    Comments.findByIdAndUpdate(req.params.commentId, {
        $set: req.body
    }, {
        new: true
    }, function (err, comment) {
        if (err) throw err;
        res.json(comment);
    });
})
// Delete comment with id
.delete(function (req, res, next) {
    Comments.findByIdAndRemove(req.params.commentId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

// Export router
module.exports = commentRouter;