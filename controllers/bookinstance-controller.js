const BookInstance = require('../models/bookinstance');

// Display list of all BookInstances.
exports.bookinstanceList = (req, res) =>  {
    res.send('NOT IMPLEMENTED: BookInstance list');
};

// Display detail page for a specific BookInstance.
exports.bookinstanceDetail = (req, res) =>  {
    res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
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