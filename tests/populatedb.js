#! /usr/bin/env node
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
}

const async = require('async');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const mongoose = require('mongoose');
const mongodb = userArgs[0];
mongoose.connect(mongodb).then(
    (res) => {
        const db = res.connection;
    }
).catch(() => {
    console.error.bind(console, 'MongoDB connectino error: ');
});
const authors = [];
const genres = [];
const books = [];
const bookInstances = [];

const authorCreate = (first_name, family_name, d_birth, d_death, cb) => {
    const authorDetail = {
        first_name: first_name,
        family_name: family_name
    };
    if (d_birth) {
        authorDetail.date_of_birth = d_birth;
    }
    ;
    if (d_death) {
        authorDetail.date_of_death = d_death;
    }
    const author = new Author(authorDetail);
    author.save(
        (err) => {
            if (err) {
                cb(err, null);
                return
            }
            console.log('New author: ' + author);
            authors.push(author)
        }
    )
};

const genreCreate = (name, cb) => {
    const genre = new Genre({name: name});
    genre.save((err) => {
        if (err) {
            cb(err, null);
        }
        console.log('New Genre: ' + genre);
        genres.push(genre);
        cb(null, genre);
    })
};

const bookCreate = (title, summary, isbn, author, genre, cb) => {
    const bookDetail = {
        title: title,
        summary: summary,
        author: author,
        isbn: isbn
    };
    if (genre) {
        bookDetail.genre = genre;
    }
    const book = new Book(bookDetail);
    book.save(
        (err) => {
            if (err) {
                cb(err, null);
            }
            console.log('New book: ' + book);
            books.push(book);
            cb(null, book);
        }
    )
};

const bookInstanceCreate = (book, imprint, due_back, status, cb) => {
    const bookInstanceDetail = {
        book: book,
        imprint: imprint
    };
    if (due_back) {
        bookInstanceDetail.due_back = due_back;
    }
    if (status) {
        bookInstanceDetail.status = status;
    }
    const bookInstance = new BookInstance(bookInstanceDetail);
    bookInstance.save(
        (err) => {
            if (err) {
                console.log('Error creating BookInstance: ' + bookInstance);
                cb(err, null);
            }
            console.log('New BookInstance: ' + bookInstance);
            bookInstances.push(bookInstance);
            cb(null, book);
        }
    )
};

const createGenreAuthors = (cb) => {
    async.parallel([
        (callback) => {
            authorCreate('Patrick', 'Rothfuss', '1973-06-06', null, callback);
        },
        (callback) => {
            authorCreate('Ben', 'Bova', '1932-11-8', null, callback);
        },
        (callback) => {
            authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
        },
        (callback) => {
            authorCreate('Bob', 'Billings', null, null, callback);
        },
        (callback) => {
            authorCreate('Jim', 'Jones', '1971-12-16', null, callback);
        }], cb)
};

const createGenres = (cb) => {
    async.parallel([
        (callback) => {
            genreCreate('Fantasy', callback);
        },
        (callback) => {
            genreCreate('Science Fiction', callback);
        },
        (callback) => {
            genreCreate('French Poetry', callback);
        }], cb)
};

