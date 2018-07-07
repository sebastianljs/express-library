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
const bookinstances = [];

const authorCreate = (first_name, family_name, d_birth, d_death, cb) => {
    const authorDetail = {
        first_name: first_name,
        family_name: family_name
    };
    if (d_birth) {
        authorDetail.date_of_birth = d_birth;
    };
    if(d_death) {
        authorDetail.date_of_death = d_death;
    }
    const author = new Author(authorDetail);
    author.save(
        (err) => {
            if(err) {
                cb(err, null);
                return
            }
            console.log('New author: ' + author);
            authors.push(author)
        }
    )
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

