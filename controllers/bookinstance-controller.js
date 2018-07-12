const BookInstance = require('../models/bookinstance');

// Display list of all BookInstances.
exports.bookinstanceList = (req, res, next) =>  {
    BookInstance.find()
        .populate('book')
        .exec((err, listBookInstances) => {
            if (err) { return next(err)}
            res.render('bookinstance-list', {
                title: 'Book Instance List',
                bookInstanceList: listBookInstances
            })
        })
};

// Display detail page for a specific BookInstance.
exports.bookinstanceDetail = (req, res) =>  {
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec((err, bookinstance) => {
            if (err) {return next(err)}
            if (bookinstance === null) {
                const err = new Error('Book copy not found');
                err.status = 404;
                return next(err)
            }
            res.render('bookinstance-detail', {
                title: 'Book: ',
                bookinstance: bookinstance
            })
        })
};

// Display BookInstance create form on GET.
exports.bookinstanceCreateGet = (req, res) =>  {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// Handle BookInstance create on POST.
exports.bookinstanceCreatePost = (req, res) =>  {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
};

// Display BookInstance delete form on GET.
exports.bookinstanceDeleteGet = (req, res) =>  {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstanceDeletePost = (req, res) =>  {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstanceUpdateGet = (req, res) =>  {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstanceUpdatePost = (req, res) =>  {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};