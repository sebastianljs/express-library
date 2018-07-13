const authorController = require('../controllers/author-controller');
const Author = require('../models/author');
const Book = require('../models/book');
const sinon = require('sinon');
require('sinon-mongoose');

describe('author-controller route tests',
    () => {
    beforeEach(() => {
    });
    afterEach(() => {
    });
    it('should list all authors', () => {
        const author1 = {
            first_name: 'Isaac',
            family_name: 'Asimov'
        };
        const author2 = {
            first_name: 'Charles',
            family_name: 'Dickens'
        };
        const expectedAuthors = [author1, author2];
        sinon.mock(Author)
            .expects('find')
            .chain('sort')
            .withArgs([['family_name', 'ascending']])
            .chain('exec')
            .yields(null, expectedAuthors);
        const req = { params: {} };
        const res = {
            render: sinon.stub()
        };
        authorController.authorList(req, res, null);
        sinon.assert.calledWith(
            res.render, 'author-list', {
                title: 'Author List',
                authorList: expectedAuthors
            }
        )
    });
    it('should display author details', () => {
        const req = {
            params: {
                id: 1
            }
        };
        const res = {
            render: sinon.stub()
        };

        const expectedAuthorDetail = {
            first_name: 'William',
            family_name: 'Shakespeare',
            date_of_birth: '1640-01-01',
            date_of_death: '1700-01-01'
        };
        const expectedAuthorBooks = [
            {title: 'Macbeth',
            summary: 'Macbeth summary'},
            {title: 'Romeo & Juliet',
            summary: 'Romeo & Juliet summary'}
        ];
        sinon.mock(Author)
            .expects('findById')
            .withArgs(req.params.id)
            .chain('exec')
            .yields(null, expectedAuthorDetail);

        sinon.mock(Book)
            .expects('find')
            .withArgs({'author': req.params.id}, 'title summary')
            .chain('exec')
            .yields(null, expectedAuthorBooks);

        authorController.authorDetail(req, res, null);
        sinon.assert.calledWith(
            res.render,
            'author-detail',
            {
                title: 'Author Detail',
                author: expectedAuthorDetail,
                authorBooks: expectedAuthorBooks
            }
        )
    })
    });
