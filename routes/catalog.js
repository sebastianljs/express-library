const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book-controller');
const authorController = require('../controllers/author-controller');
const genreController = require('../controllers/genre-controller');
const bookinstanceController = require('../controllers/bookinstance-controller');

router.get('/', bookController.index);
