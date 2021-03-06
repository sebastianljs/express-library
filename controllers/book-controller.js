const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');
exports.index = (req, res) => {
    async.parallel({
        bookCount: (callback) => {
            Book.count({}, callback)
        },
        bookInstanceCount: (callback) => {
            BookInstance.count({}, callback);
        },
        bookInstanceAvailableCount: (callback) => {
            BookInstance.count({status: 'Available'}, callback);
        },
        authorCount: (callback) => {
            Author.count({}, callback);
        },
        genreCount: (callback) => {
            Genre.count({}, callback);
        }
    }, (err, results) => {
        res.render('index', { title: 'Local Library Home', error: err, data: results})
    })
};

// Display list of all books.
exports.bookList = (req, res, next) => {
    Book.find({}, 'title author')
        .populate('author')
        .exec((err, listBooks) => {
            if (err) {return next(err)}
            res.render('book-list', {title: 'Book List', bookList: listBooks})
        })
};

// Display detail page for a specific book.
exports.bookDetail = (req, res) => {
    async.parallel({
        book: (cb) => {
            Book.findById(req.params.id)
                .populate('author')
                .populate('genre')
                .exec(cb)
        },
        bookInstances: (cb) => {
            BookInstance.find({'book': req.params.id})
                .exec(cb)
        }
    },
        (err, results) => {
            if (err) { return next(err)}
            if (results.book === null) {
                const err = new Error('Book not found');
                err.status = 404;
                return next(err)
            }
            res.render('book-detail', {
                title: 'Title',
                book: results.book,
                bookInstances: results.bookInstances
            })
        })
};

// Display book create form on GET.
exports.bookCreateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.bookCreatePost = (req, res) => {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.bookDeleteGet = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.bookDeletePost = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.bookUpdateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.bookUpdatePost = (req, res) =>{
    res.send('NOT IMPLEMENTED: Book update POST');
};
