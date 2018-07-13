const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');
// Display list of all Authors.
exports.authorList = (req, res, next) =>  {
    Author.find()
        .sort([['family_name', 'ascending']])
        .exec((err, listAuthors) => {
            res.render('author-list', {
                title: 'Author List',
                authorList: listAuthors
            })
        })
};

// Display detail page for a specific Author.
exports.authorDetail = (req, res, next) =>  {
    async.parallel({
        author: (cb) => {
            Author.findById(req.params.id)
                .exec(cb)
        },
        authorBooks: (cb) => {
            Book.find({'author': req.params.id}, 'title summary')
                .exec(cb)
        }
    }, (err, results) => {
        if (err) {return next(err)}
        if (results.author===null) {
            const err = new Error('Author not found');
            err.status = 404;
            return next(err)
        }
        res.render('author-detail', {
            title: 'Author Detail',
            author: results.author,
            authorBooks: results.authorBooks })
    })
};

// Display Author create form on GET.
exports.authorCreateGet = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.authorCreatePost = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.authorDeleteGet = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.authorDeletePost = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.authorUpdateGet = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.authorUpdatePost = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Author update POST');
};