const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');
// Display list of all Genre.
exports.genreList = (req, res, next) => {
   Genre.find()
       .sort([['name', 'ascending']])
       .exec((err, listGenres) => {
           if (err) {
               return next(err)
           }
           res.render('genre-list', {
               title: 'Genre List',
               genreList: listGenres
           })
       })
};
// Display detail page for a specific Genre.
exports.genreDetail = (req, res, next) =>  {
    async.parallel({
        genre: (cb) => {
            Genre.findById(req.params.id)
                .exec(cb);
        },
        genreBooks: (cb) => {
            Book.find({'genre': req.params.id})
                .exec(cb);
        }
    }, (err, results) => {
        if (err) { return next(err)}
        if (results.genre==null) {
            const err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        res.render('genre-detail', {
            title: 'Genre Detail',
            genre: results.genre,
            genreBooks: results.genreBooks
        })
    })
};

// Display Genre create form on GET.
exports.genreCreateGet = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genreCreatePost = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET.
exports.genreDeleteGet = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genreDeletePost = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genreUpdateGet = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genreUpdatePost = (req, res) =>  {
    res.send('NOT IMPLEMENTED: Genre update POST');
};